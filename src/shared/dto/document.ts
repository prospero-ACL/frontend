import z from 'zod';

export const BOOK_POSITIONS = [1, 2, 3] as const;
export type BookPosition = (typeof BOOK_POSITIONS)[number];

export const trilogyUploadSchema = z.object({
  trilogyName: z.string().trim().min(1),
  books: z
    .array(z.object({ position: z.number(), file: z.instanceof(File) }))
    .length(BOOK_POSITIONS.length),
});
export type TrilogyUpload = z.infer<typeof trilogyUploadSchema>;

export const ingestionStatusSchema = z.enum(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED']);
export type IngestionStatus = z.infer<typeof ingestionStatusSchema>;

export const ingestionJobSchema = z.object({
  id: z.uuid(),
  trilogy: z.string(),
  status: ingestionStatusSchema,
  booksDone: z.number(),
  booksTotal: z.number(),
  chunksWritten: z.number(),
  error: z.string().nullable(),
});
export type IngestionJob = z.infer<typeof ingestionJobSchema>;

export function isIngestionFinished(job: IngestionJob) {
  return job.status === 'COMPLETED' || job.status === 'FAILED';
}
