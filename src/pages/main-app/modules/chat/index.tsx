import { Button, Group, LoadingOverlay, Stack, Text, Textarea } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import MessageList from './components/message-list';
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
      <LoadingOverlay visible={isLoading} />
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
      <Group mt="sm" align="flex-start">
        <Textarea
          style={{ flex: 1 }}
          placeholder="Type your message here..."
          autosize
          minRows={1}
          maxRows={4}
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="outline" color="blue" onClick={sendMessage} disabled={!input.trim()}>
          Send
        </Button>
      </Group>
      {sendError && (
        <Text size="sm" c="red">
          {sendError}
        </Text>
      )}
    </Stack>
  );
}
