import type { PartCategory, UserResponse } from './user';

// ========== Enums ==========

export type WorkspaceType = 'BAND' | 'ACAPELLA' | 'ORCHESTRA';

export type WorkspaceRole = 'OWNER' | 'ADMIN' | 'MEMBER';

// ========== Models ==========

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: WorkspaceType;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  part: PartCategory | null;
  joinedAt: Date;
  updatedAt: Date;
  user?: UserResponse;
}

// ========== DTOs ==========

export interface CreateWorkspaceDto {
  name: string;
  slug: string;
  description?: string;
  type: WorkspaceType;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
  type?: WorkspaceType;
  imageUrl?: string;
}

export interface AddMemberDto {
  userId: string;
  role?: WorkspaceRole;
  part?: PartCategory;
}

export interface UpdateMemberDto {
  role?: WorkspaceRole;
  part?: PartCategory;
}

// ========== Responses ==========

export interface WorkspaceResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: WorkspaceType;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceWithRoleResponse extends WorkspaceResponse {
  myRole: WorkspaceRole;
  memberCount: number;
}

export interface WorkspaceMemberResponse {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  part: PartCategory | null;
  joinedAt: string;
  user: UserResponse;
}
