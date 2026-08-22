import { Group, Stack, Text, Button, Textarea, Modal, LoadingOverlay } from '@mantine/core';
import { useAppSelector } from '@/config/store';
import useChat from './hooks/use-chat';

export default function Chat() {
  const { openDocumentsModal, closeDocumentsModal, isDocumentsModalOpen } = useChat();
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  return (
    <>
      <Stack p="sm" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <Text>Welcome to Prospero ACL, a RAG system</Text>
        <Text>Click the button to start an new Report creation</Text>

        <Group mt="sm">
          <Button onClick={openDocumentsModal} variant="outline" color="blue">
            Start New Report
          </Button>
        </Group>
        <Group mt="sm">
          <Textarea placeholder="Type your message here..." autosize minRows={1} maxRows={4} />
          <Button variant="outline" color="blue">
            Start Chat
          </Button>
        </Group>
      </Stack>

      <Modal opened={isDocumentsModalOpen} onClose={closeDocumentsModal} title="Documents" centered>
        <Text>Select docs to yuse</Text>
      </Modal>
    </>
  );
}
