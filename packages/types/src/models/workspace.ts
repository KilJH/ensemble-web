export type WorkspaceType = 'band' | 'acapella' | 'orchestra';

export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  type: WorkspaceType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
  type: WorkspaceType;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
  type?: WorkspaceType;
}

export interface WorkspaceResponse {
  id: string;
  name: string;
  description: string | null;
  type: WorkspaceType;
  createdAt: string;
  updatedAt: string;
}
