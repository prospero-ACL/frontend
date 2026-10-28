import { Button, Group, ScrollArea, Stack, Text } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import MessageList from './components/message-list';
import PromptBar from './components/prompt-bar';
import useChat from './hooks/use-chat';

export default function Chat() {
  const {
    messages,
    viewportRef,
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
    <Stack
      p="sm"
      pos="relative"
      w="100%"
      h="calc(100dvh - var(--app-shell-header-height) - 2 * var(--app-shell-padding))"
    >
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
      <ScrollArea flex={1} viewportRef={viewportRef} type="auto" offsetScrollbars>
        <MessageList messages={messages} />
      </ScrollArea>
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
