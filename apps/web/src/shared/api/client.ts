import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/shared/config';

// Separate client for auth operations - no interceptors to avoid refresh loop
export const authClient = axios.create({
  baseURL: `${env.API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = axios.create({
  baseURL: `${env.API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null = null;
let isRefreshing = false;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only try refresh once per request, and not if already refreshing
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use authClient to avoid infinite loop - it doesn't have this interceptor
        const response = await authClient.post('/auth/refresh');
        const newToken = response.data.accessToken;
        setAccessToken(newToken);
        isRefreshing = false;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch {
        setAccessToken(null);
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
