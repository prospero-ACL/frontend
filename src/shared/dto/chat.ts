import z from 'zod';
import { documentScopeSchema } from '@/shared/dto/document';

export const chatRoleSchema = z.enum(['user', 'assistant']);

export const chatMessageSchema = z.object({
  id: z.string(),
  role: chatRoleSchema,
  content: z.string(),
});

export type ChatRole = z.infer<typeof chatRoleSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const reportStatusSchema = z.enum(['DRAFT', 'IN_PROGRESS', 'COMPLETED']);
export type ReportStatus = z.infer<typeof reportStatusSchema>;

export const reportTurnSchema = z.object({
  position: z.number(),
  prompt: z.string(),
  reply: z.string(),
});
export type ReportTurn = z.infer<typeof reportTurnSchema>;

export const reportSchema = z.object({
  id: z.uuid(),
  status: reportStatusSchema,
  turns: z.array(reportTurnSchema),
});
export type Report = z.infer<typeof reportSchema>;

export const reportCreateRequestSchema = z.object({
  prompt: z.string(),
  scope: documentScopeSchema,
  chunks: z.array(z.uuid()),
});
export type ReportCreateRequest = z.infer<typeof reportCreateRequestSchema>;

export const reportContinueRequestSchema = z.object({
  prompt: z.string(),
});
export type ReportContinueRequest = z.infer<typeof reportContinueRequestSchema>;
