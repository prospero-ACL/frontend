import { KeyboardEvent, useEffect, useState } from 'react';
import api from '@/config/api';
import { clearConversationId, setConversationId } from '@/config/reducers/conversation.reducer';
import { setGlobalLoading } from '@/config/reducers/loading.reducer';
import { useAppDispatch, useAppSelector } from '@/config/store';
import { Conversation } from '@/shared/dto/chat';
import { buildMessages } from '../utils/messages';

function toErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'status' in err) {
    const status = (err as { status?: number }).status;
    if (status === 404) {
      return 'This conversation could not be found. It may have been removed.';
    }
  }
  return 'Something went wrong sending your message. Please try again.';
}

export default function useChat() {
  const dispatch = useAppDispatch();
  const persistedId = useAppSelector((state) => state.conversation.id);

  const [conversation, setConversation] = useState<Conversation | null>(null);
  // Set when the user asks for a blank conversation, so the latest one is not re-adopted.
  const [isStartingFresh, setIsStartingFresh] = useState(false);
  const [input, setInput] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);

  const {
    data: fetchedConversation,
    isFetching: isGetConversationFetching,
    isError: isGetConversationError,
  } = api.useGetConversationQuery(persistedId ?? '', { skip: !persistedId });

  const { data: latestConversation, isFetching: isLatestFetching } =
    api.useGetLatestConversationQuery(undefined, { skip: !!persistedId || isStartingFresh });

  useEffect(() => {
    if (!persistedId) {
      return;
    }
    if (fetchedConversation) {
      setConversation(fetchedConversation);
    } else if (isGetConversationError) {
      dispatch(clearConversationId());
      setConversation(null);
    }
  }, [persistedId, fetchedConversation, isGetConversationError, dispatch]);

  useEffect(() => {
    if (persistedId || isStartingFresh || !latestConversation) {
      return;
    }
    dispatch(setConversationId(latestConversation.id));
    setConversation(latestConversation);
  }, [persistedId, isStartingFresh, latestConversation, dispatch]);

  function handleStartNewConversation() {
    setIsStartingFresh(true);
    dispatch(clearConversationId());
    setConversation(null);
    setInput('');
    setSendError(null);
  }

  const [createConversation, { isLoading: isCreateLoading }] = api.useCreateConversationMutation();
  const [continueConversation, { isLoading: isContinueLoading }] =
    api.useContinueConversationMutation();

  async function sendMessage() {
    const content = input.trim();
    if (!content) {
      return;
    }
    setSendError(null);
    setInput('');
    try {
      const result = conversation
        ? await continueConversation({ conversationId: conversation.id, prompt: content }).unwrap()
        : await createConversation({ prompt: content }).unwrap();
      setConversation(result);
      dispatch(setConversationId(result.id));
    } catch (err) {
      setInput(content);
      setSendError(toErrorMessage(err));
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  const isLoading =
    isGetConversationFetching || isLatestFetching || isCreateLoading || isContinueLoading;

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalLoading(false));
    };
  }, [dispatch]);

  return {
    messages: buildMessages(conversation),
    hasConversation: conversation !== null,
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    sendError,
    handleStartNewConversation,
  };
}
