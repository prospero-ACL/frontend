import { ChatMessage, Conversation } from '@/shared/dto/chat';

export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! Ask me anything about the trilogies in the knowledge base. I'll answer from the books your clearance lets you read.",
};

const MISSING_REPLY = 'No reply was recorded for this question.';

export function buildMessages(conversation: Conversation | null): Array<ChatMessage> {
  if (!conversation) {
    return [WELCOME_MESSAGE];
  }
  return conversation.turns.flatMap((turn) => [
    { id: `${turn.position}-user`, role: 'user', content: turn.prompt } as ChatMessage,
    {
      id: `${turn.position}-assistant`,
      role: 'assistant',
      content: turn.reply ?? MISSING_REPLY,
    } as ChatMessage,
  ]);
}
