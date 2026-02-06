import { z } from 'zod';

// ========== Part Category ==========

export const partCategorySchema = z.enum([
  'VOCAL',
  'GUITAR',
  'BASS',
  'DRUMS',
  'KEYS',
  'BRASS',
  'STRINGS',
  'PERCUSSION',
  'OTHER',
]);

// ========== Onboarding ==========

export const completeOnboardingSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(20, '닉네임은 20자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9_]+$/, '닉네임은 한글, 영문, 숫자, 밑줄만 사용 가능합니다'),
  defaultPart: partCategorySchema.optional(),
});

// ========== Update User ==========

export const updateUserSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(20, '닉네임은 20자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9_]+$/, '닉네임은 한글, 영문, 숫자, 밑줄만 사용 가능합니다')
    .optional(),
  defaultPart: partCategorySchema.optional(),
  profileImageUrl: z.string().url().optional(),
});

// ========== Types ==========

export type PartCategoryInput = z.infer<typeof partCategorySchema>;
export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
