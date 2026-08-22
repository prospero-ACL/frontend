import { Group, Stack, Text, Button, Textarea } from '@mantine/core';
import useChat from './hooks/use-chat';

export default function Chat() {
  const {} = useChat();

  return (
    <Stack p="sm">
      <Text>Welcome to Prospero ACL, a RAG system</Text>

      <Group mt="sm">
        <Textarea placeholder="Type your message here..." autosize minRows={1} maxRows={4} />
        <Button variant="outline" color="blue">
          Start Chat
        </Button>
      </Group>
    </Stack>
  );
}
