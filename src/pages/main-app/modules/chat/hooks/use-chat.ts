import { useDisclosure } from '@mantine/hooks';
import { KeyboardEvent, useEffect, useState } from 'react';
import api from '@/config/api';
import { setGlobalLoading } from '@/config/reducers/loading.reducer';
import { clearReportId, setReportId } from '@/config/reducers/report.reducer';
import { useAppDispatch, useAppSelector } from '@/config/store';
import { Report } from '@/shared/dto/chat';
import { buildMessages } from '../utils/messages';

function toErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'status' in err) {
    const status = (err as { status?: number }).status;
    if (status === 409) {
      return 'This report has reached its 3-question limit.';
    }
    if (status === 404) {
      return 'This report could not be found. It may have been removed.';
    }
  }
  return 'Something went wrong sending your message. Please try again.';
}

export default function useChat() {
  const dispatch = useAppDispatch();
  const persistedId = useAppSelector((state) => state.report.id);
  const user = useAppSelector((state) => state.auth.user);

  const [report, setReport] = useState<Report | null>(null);
  const [hasStartedReport, setHasStartedReport] = useState(false);
  const [pendingDocumentIds, setPendingDocumentIds] = useState<Array<string>>([]);
  const [input, setInput] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);

  const {
    data: fetchedReport,
    isFetching: isGetReportFetching,
    isError: isGetReportError,
  } = api.useGetReportQuery(persistedId ?? '', { skip: !persistedId });

  const { data: draftReport, isFetching: isDraftFetching } = api.useGetDraftReportQuery(undefined, {
    skip: !!persistedId,
  });

  useEffect(() => {
    if (!persistedId) {
      return;
    }
    if (fetchedReport) {
      if (fetchedReport.status === 'COMPLETED') {
        dispatch(clearReportId());
        setReport(null);
      } else {
        setReport(fetchedReport);
      }
    } else if (isGetReportError) {
      dispatch(clearReportId());
      setReport(null);
    }
  }, [persistedId, fetchedReport, isGetReportError, dispatch]);

  useEffect(() => {
    if (persistedId || !draftReport) {
      return;
    }
    dispatch(setReportId(draftReport.id));
    setReport(draftReport);
  }, [persistedId, draftReport, dispatch]);

  const [isDocumentsModalOpen, { open: openDocumentsModal, close: closeDocumentsModal }] =
    useDisclosure(false);
  const { data: userDocumentsData, isFetching: isDocsFetching } = api.useGetUserDocumentsQuery(
    user!.id,
    { skip: !isDocumentsModalOpen }
  );
  const userDocuments = userDocumentsData ?? [];

  function handleStartNewReport(documentIds: Array<string>) {
    setPendingDocumentIds(documentIds);
    setHasStartedReport(true);
  }

  const [createReport, { isLoading: isCreateLoading }] = api.useCreateReportMutation();
  const [continueReport, { isLoading: isContinueLoading }] = api.useContinueReportMutation();

  async function sendMessage() {
    const content = input.trim();
    if (!content) {
      return;
    }
    setSendError(null);
    setInput('');
    try {
      const result = report
        ? await continueReport({ reportId: report.id, prompt: content }).unwrap()
        : await createReport({
            prompt: content,
            scope: 'PUBLIC',
            chunks: pendingDocumentIds,
          }).unwrap();
      setReport(result);
      dispatch(setReportId(result.id));
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
    isGetReportFetching ||
    isDraftFetching ||
    isDocsFetching ||
    isCreateLoading ||
    isContinueLoading;

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setGlobalLoading(false));
    };
  }, [dispatch]);

  const messages = buildMessages(report, hasStartedReport);

  return {
    showChatView: hasStartedReport || report !== null,
    messages,
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    sendError,
    isReportCompleted: report?.status === 'COMPLETED',
    isDocumentsModalOpen,
    openDocumentsModal,
    closeDocumentsModal,
    userDocuments,
    handleStartNewReport,
  };
}
