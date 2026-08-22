import { Stack, Text } from '@mantine/core';
import { ChatMessage } from '@/shared/dto/chat';
import MessageBubble from './message-bubble';

export type MessageListProps = { messages: Array<ChatMessage> };

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <Text c="dimmed" size="sm">
        No messages yet. Start the conversation below.
      </Text>
    );
  }

  return (
    <Stack gap="xs">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </Stack>
  );
}
