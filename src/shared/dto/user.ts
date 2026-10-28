import z from 'zod';

// Mirrors the backend's ResponseUserDTO; every column but id is nullable in Postgres.
export const userSchema = z.object({
  id: z.uuid(),
  email: z.email().nullable(),
  name: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  theme: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
