import { Button, Group, LoadingOverlay, Stack, Text, Textarea } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import DocumentsSelectModal from './components/documents-select-modal';
import MessageList from './components/message-list';
import useChat from './hooks/use-chat';

export default function Chat() {
  const {
    showChatView,
    messages,
    input,
    setInput,
    handleKeyDown,
    sendMessage,
    sendError,
    isReportCompleted,
    isDocumentsModalOpen,
    openDocumentsModal,
    closeDocumentsModal,
    userDocuments,
    handleStartNewReport,
  } = useChat();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <>
      <Stack p="sm" pos="relative" h="100%">
        <LoadingOverlay visible={isLoading} />
        {!showChatView ? (
          <>
            <Text>Welcome to Prospero ACL, a RAG system</Text>
            <Text>Click the button to start a new Report creation</Text>
            <Group mt="sm">
              <Button onClick={openDocumentsModal} variant="outline" color="blue">
                Start New Report
              </Button>
            </Group>
          </>
        ) : (
          <>
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
                disabled={isReportCompleted}
              />
              <Button
                variant="outline"
                color="blue"
                onClick={sendMessage}
                disabled={isReportCompleted || !input.trim()}
              >
                Send
              </Button>
            </Group>
            {isReportCompleted && (
              <Text size="sm" c="dimmed">
                This report has reached its 3-question limit.
              </Text>
            )}
            {sendError && (
              <Text size="sm" c="red">
                {sendError}
              </Text>
            )}
          </>
        )}
      </Stack>
      <DocumentsSelectModal
        opened={isDocumentsModalOpen}
        onClose={closeDocumentsModal}
        onConfirm={handleStartNewReport}
        documents={userDocuments}
      />
    </>
  );
}
