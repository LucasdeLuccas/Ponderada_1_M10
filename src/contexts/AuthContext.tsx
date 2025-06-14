import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/auth';
import { User, LoginCredentials, RegisterData } from '@/types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [storedUser, storedToken] = await Promise.all([
        AsyncStorage.getItem('@AuthData:user'),
        AsyncStorage.getItem('@AuthData:token'),
      ]);

      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);
        const validatedUser = await authService.validateToken(storedToken);
        if (validatedUser) {
          setUser(userData);
        } else {
          await signOut();
        }
      }
    } catch (err) {
      console.error('Erro ao carregar dados armazenados:', err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.login(credentials.email, credentials.password);
      await Promise.all([
        AsyncStorage.setItem('@AuthData:user', JSON.stringify(user)),
        AsyncStorage.setItem('@AuthData:token', token),
      ]);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await Promise.all([
        AsyncStorage.setItem('@AuthData:user', JSON.stringify(user)),
        AsyncStorage.setItem('@AuthData:token', token),
      ]);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await Promise.all([
        AsyncStorage.removeItem('@AuthData:user'),
        AsyncStorage.removeItem('@AuthData:token'),
      ]);
      setUser(null);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authService.forgotPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao recuperar senha');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await authService.resetPassword(email, newPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao redefinir senha');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      if (!user) throw new Error('Usuário não autenticado');

      const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
      await AsyncStorage.setItem('@AuthData:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        resetPassword,
        clearError,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
