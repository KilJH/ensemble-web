import { create } from 'zustand';
import { setAccessToken } from '@/shared/api';
import type { AuthStore } from './auth.types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isOnboarded: false,

  setAuth: (user, token) => {
    setAccessToken(token);
    set({
      user,
      isLoading: false,
      isAuthenticated: true,
      isOnboarded: user.isOnboarded,
    });
  },

  clearAuth: () => {
    setAccessToken(null);
    set({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isOnboarded: false,
    });
  },

  updateUser: (updates) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...updates };
      return {
        user: updatedUser,
        isOnboarded: updatedUser.isOnboarded,
      };
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));
