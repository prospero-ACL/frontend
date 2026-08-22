import { Paper, Text } from '@mantine/core';
import { ChatMessage } from '@/shared/dto/chat';

export type MessageBubbleProps = { message: ChatMessage };

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <Paper
      p="sm"
      radius="md"
      maw="70%"
      ml={isUser ? 'auto' : undefined}
      mr={isUser ? undefined : 'auto'}
      bg={isUser ? 'blue' : undefined}
      c={isUser ? 'white' : undefined}
      withBorder={!isUser}
    >
      <Text size="sm">{message.content}</Text>
    </Paper>
  );
}
