import { z } from 'zod';

// ========== Google OAuth ==========

export const googleAuthSchema = z.object({
  code: z.string().min(1, 'Authorization code is required'),
  redirectUri: z.string().url().optional(),
});

// ========== Types ==========

export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;
