'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useAuthStore } from '../model/auth.store';
import { authApi } from '../api/auth.api';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, clearAuth } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent duplicate initialization (React 18 Strict Mode calls effects twice)
    if (initialized.current) return;
    initialized.current = true;

    const initAuth = async () => {
      try {
        const response = await authApi.refresh();
        setAuth(response.user, response.accessToken);
      } catch {
        clearAuth();
      }
    };

    initAuth();
  }, [setAuth, clearAuth]);

  return <>{children}</>;
}
