import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, ErrorMessage, Loading } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/constants';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSendOTP = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    // Simulação de envio de OTP
    setTimeout(() => {
      setLoading(false);
      if (email) {
        setSuccess('Código enviado para seu e-mail!');
        navigation.navigate(ROUTES.AUTH.RESET_PASSWORD as never, { email } as any);
      } else {
        setError('Informe um e-mail válido.');
      }
    }, 1000);
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
      />
      <ErrorMessage message={error || undefined} />
      {success && <Text style={styles.success}>{success}</Text>}
      {loading ? <Loading /> : <Button title="Enviar código" onPress={handleSendOTP} />}
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
