import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData } from '../types';
import { authService } from '../services/auth';

const TOKEN_KEY = '@FutStore:token';
const USER_KEY = '@FutStore:user';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextData extends AuthState {
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): AuthContextData => {
  const [data, setData] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function loadStoredData(): Promise<void> {
      try {
        const [token, userStr] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);

        if (token && userStr) {
          const user = JSON.parse(userStr) as User;
          const validatedUser = await authService.validateToken(token);

          if (validatedUser) {
            setData({
              user: validatedUser,
              token,
              loading: false,
              error: null,
            });
          } else {
            await signOut();
          }
        } else {
          setData(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Erro ao carregar dados do usuário',
        }));
      }
    }

    loadStoredData();
  }, []);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      const { user, token } = await authService.login(credentials.email, credentials.password);

      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, token),
        AsyncStorage.setItem(USER_KEY, JSON.stringify(user)),
      ]);

      setData({
        user,
        token,
        loading: false,
        error: null,
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao fazer login',
      }));
    }
  }, []);

  const signUp = useCallback(async (data: RegisterData) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      if (data.password !== data.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const { user, token } = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, token),
        AsyncStorage.setItem(USER_KEY, JSON.stringify(user)),
      ]);

      setData({
        user,
        token,
        loading: false,
        error: null,
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao criar conta',
      }));
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(USER_KEY)]);

      setData({
        user: null,
        token: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        error: 'Erro ao fazer logout',
      }));
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      await authService.forgotPassword(email);
      setData(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao solicitar recuperação de senha',
      }));
    }
  }, []);

  const resetPassword = useCallback(async (email: string, newPassword: string) => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));
      await authService.resetPassword(email, newPassword);
      setData(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao redefinir senha',
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setData(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...data,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    clearError,
  };
};
