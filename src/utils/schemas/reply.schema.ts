import { z } from 'zod';

export const createReplySchema = z.object({
  content: z.string().max(280),
});

export type CreateReplySchemaDTO = z.infer<typeof createReplySchema>;
