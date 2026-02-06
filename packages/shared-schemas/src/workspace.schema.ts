import { z } from 'zod';
import { partCategorySchema } from './user.schema';

// ========== Enums ==========

export const workspaceTypeSchema = z.enum(['BAND', 'ACAPELLA', 'ORCHESTRA']);

export const workspaceRoleSchema = z.enum(['OWNER', 'ADMIN', 'MEMBER']);

// ========== Workspace ==========

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, '워크스페이스 이름은 2자 이상이어야 합니다')
    .max(100, '워크스페이스 이름은 100자 이하여야 합니다'),
  slug: z
    .string()
    .min(2, 'URL 주소는 2자 이상이어야 합니다')
    .max(50, 'URL 주소는 50자 이하여야 합니다')
    .regex(/^[a-z0-9-]+$/, 'URL 주소는 소문자, 숫자, 하이픈만 사용 가능합니다'),
  description: z.string().max(500, '설명은 500자 이하여야 합니다').optional(),
  type: workspaceTypeSchema,
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  type: workspaceTypeSchema.optional(),
  imageUrl: z.string().url().optional(),
});

// ========== Member Management ==========

export const addMemberSchema = z.object({
  userId: z.string().uuid('유효한 사용자 ID가 필요합니다'),
  role: workspaceRoleSchema.optional(),
  part: partCategorySchema.optional(),
});

export const updateMemberSchema = z.object({
  role: workspaceRoleSchema.optional(),
  part: partCategorySchema.optional(),
});

// ========== Types ==========

export type WorkspaceTypeInput = z.infer<typeof workspaceTypeSchema>;
export type WorkspaceRoleInput = z.infer<typeof workspaceRoleSchema>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
