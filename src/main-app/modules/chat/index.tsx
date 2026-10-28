import { Button, Group, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import MessageList from './components/message-list';
import PromptBar from './components/prompt-bar';
import useChat from './hooks/use-chat';

export default function Chat() {
  const {
    messages,
    hasConversation,
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    sendError,
    handleStartNewConversation,
  } = useChat();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <Stack p="sm" pos="relative" h="100%">
      <Group justify="flex-end">
        <Button
          variant="outline"
          color="blue"
          onClick={handleStartNewConversation}
          disabled={!hasConversation}
        >
          New conversation
        </Button>
      </Group>
      <MessageList messages={messages} />
      <PromptBar
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        sendMessage={sendMessage}
        isLoading={isLoading}
        sendError={sendError}
      />
      {sendError && (
        <Text size="sm" c="red">
          {sendError}
        </Text>
      )}
    </Stack>
  );
}
