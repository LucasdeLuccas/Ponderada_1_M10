import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, ErrorMessage, Loading } from '@/components';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/constants';

export const ResetPasswordScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    // Simulação de reset de senha
    setTimeout(() => {
      setLoading(false);
      if (otp === '123456' && password.length >= 6) {
        setSuccess('Senha redefinida com sucesso!');
        setTimeout(() => navigation.navigate(ROUTES.AUTH.LOGIN as never), 1000);
      } else {
        setError('Código inválido ou senha muito curta.');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Código (OTP)"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        leftIcon={{ name: 'vpn-key', type: 'material' }}
      />
      <Input
        placeholder="Nova senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        leftIcon={{ name: 'lock', type: 'material' }}
      />
      <ErrorMessage message={error || undefined} />
      {success && <Text style={styles.success}>{success}</Text>}
      {loading ? <Loading /> : <Button title="Redefinir senha" onPress={handleReset} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  success: {
    color: '#388E3C',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
});
