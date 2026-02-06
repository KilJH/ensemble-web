import { apiClient } from '@/shared/api';
import type {
  AuthResponse,
  GoogleAuthRequest,
  CompleteOnboardingRequest,
} from '../model/auth.types';
import type { UserResponse } from '@ensemble/types';

export const authApi = {
  googleAuth: async (data: GoogleAuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/google', data);
    return response.data;
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/users/me');
    return response.data;
  },

  completeOnboarding: async (data: CompleteOnboardingRequest): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/users/me/onboarding', data);
    return response.data;
  },
};
