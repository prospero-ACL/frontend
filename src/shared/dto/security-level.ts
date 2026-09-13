import z from 'zod';

export const securityLevelSchema = z.enum(['PLEBIAN', 'EQUES', 'PATRICIAN']);

export const securityLevelResponseSchema = z.object({
  securityLevel: securityLevelSchema,
});

export type SecurityLevel = z.infer<typeof securityLevelSchema>;
export type SecurityLevelResponse = z.infer<typeof securityLevelResponseSchema>;
