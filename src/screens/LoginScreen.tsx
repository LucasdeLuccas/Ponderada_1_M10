import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input, Button, ErrorMessage, Loading } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/constants';
import { useAuthContext } from '@/contexts/AuthContext';
import { theme } from '@/styles/theme';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signIn, loading, error, clearError } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signIn({ email, password });
    } catch (err) {
      // O erro já é tratado pelo contexto
    }
  };

  const handleForgotPassword = () => {
    clearError();
    navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD as never);
  };

  const handleRegister = () => {
    clearError();
    navigation.navigate(ROUTES.AUTH.REGISTER as never);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ name: 'email', type: 'material' }}
        editable={!loading}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        leftIcon={{ name: 'lock', type: 'material' }}
        editable={!loading}
      />
      {error && <ErrorMessage message={error} />}
      {loading ? <Loading /> : <Button title="Entrar" onPress={handleLogin} />}
      <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} disabled={loading}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  link: {
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
});
