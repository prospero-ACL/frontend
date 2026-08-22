import { ChatMessage, Report } from '@/shared/dto/chat';

export const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm ready to help you build a report from your documents. Ask me anything to get started.",
};

export function buildMessages(
  report: Report | null,
  hasStartedReport: boolean
): Array<ChatMessage> {
  if (!report) {
    return hasStartedReport ? [WELCOME_MESSAGE] : [];
  }
  return report.turns.flatMap((turn) => [
    { id: `${turn.position}-user`, role: 'user', content: turn.prompt } as ChatMessage,
    { id: `${turn.position}-assistant`, role: 'assistant', content: turn.reply } as ChatMessage,
  ]);
}
