import { z } from 'zod';

export const workspaceTypeSchema = z.enum(['band', 'acapella', 'orchestra']);

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, '워크스페이스 이름은 2자 이상이어야 합니다').max(100),
  description: z.string().max(500).optional(),
  type: workspaceTypeSchema,
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  type: workspaceTypeSchema.optional(),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type WorkspaceType = z.infer<typeof workspaceTypeSchema>;
