import z from 'zod';

export const chatRoleSchema = z.enum(['user', 'assistant']);

export const chatMessageSchema = z.object({
  id: z.string(),
  role: chatRoleSchema,
  content: z.string(),
});

export type ChatRole = z.infer<typeof chatRoleSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const conversationTurnSchema = z.object({
  position: z.number(),
  prompt: z.string(),
  // null when a prompt was stored without a reply; the backend pairs them by position
  reply: z.string().nullable(),
});
export type ConversationTurn = z.infer<typeof conversationTurnSchema>;

export const conversationSchema = z.object({
  id: z.uuid(),
  turns: z.array(conversationTurnSchema),
});
export type Conversation = z.infer<typeof conversationSchema>;

export const conversationCreateRequestSchema = z.object({
  prompt: z.string(),
});
export type ConversationCreateRequest = z.infer<typeof conversationCreateRequestSchema>;

export const conversationContinueRequestSchema = z.object({
  prompt: z.string(),
});
export type ConversationContinueRequest = z.infer<typeof conversationContinueRequestSchema>;
