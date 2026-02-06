import type { UserResponse, PartCategory } from '@ensemble/types';

export interface AuthState {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboarded: boolean;
}

export interface AuthActions {
  setAuth: (user: UserResponse, token: string) => void;
  clearAuth: () => void;
  updateUser: (updates: Partial<UserResponse>) => void;
  setLoading: (loading: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

export interface GoogleAuthRequest {
  code: string;
  redirectUri?: string;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}

export interface CompleteOnboardingRequest {
  nickname: string;
  defaultPart?: PartCategory;
}
