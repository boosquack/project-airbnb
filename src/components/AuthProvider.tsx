import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';

import api from '@/api';
import type { CleanUser } from '@/types';
import type { AuthResponse } from '@/types/api';

interface AuthContextType {
  token: string | null | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  user: CleanUser | null;
  setUser: React.Dispatch<React.SetStateAction<CleanUser | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return authContext;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [user, setUser] = useState<CleanUser | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get<AuthResponse>('/api/me');
        setToken(response.data.accessToken);
        setUser(response.data.user);
      } catch {
        setToken(null);
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      const customConfig = config as CustomAxiosRequestConfig;
      customConfig.headers.Authorization =
        !customConfig._retry && token
          ? `Bearer ${token}`
          : customConfig.headers.Authorization;
      return customConfig;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<{ message: string }>) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (
          error.response?.status === 403 &&
          error.response?.data?.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get<AuthResponse>('/api/refreshToken');

            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
