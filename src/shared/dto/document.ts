import z from 'zod';

export const documentScopeSchema = z.enum(['PUBLIC', 'RESTRICTED', 'ELEVATED']);

export const documentSchema = z.object({
  name: z.string(),
  uploadedAt: z.string(),
});

export const uploadDocumentSchema = z.object({
  file: z.instanceof(File),
  userId: z.string(),
  scope: documentScopeSchema,
});

export type DocumentScope = z.infer<typeof documentScopeSchema>;
export type UploadDocument = z.infer<typeof uploadDocumentSchema>;
export type Document = z.infer<typeof documentSchema>;
