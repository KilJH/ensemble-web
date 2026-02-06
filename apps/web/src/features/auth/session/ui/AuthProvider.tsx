'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '../model/auth.store';
import { authApi } from '../api/auth.api';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, clearAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await authApi.refresh();
        setAuth(response.user, response.accessToken);
      } catch {
        clearAuth();
      }
    };

    initAuth();
  }, [setAuth, clearAuth, setLoading]);

  return <>{children}</>;
}
