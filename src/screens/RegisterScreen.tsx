import React, { useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input, Button, ErrorMessage, Loading } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/constants';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      if (email && password && name) {
        navigation.navigate(ROUTES.AUTH.LOGIN as never);
      } else {
        setError('Preencha todos os campos.');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        leftIcon={{ name: 'person', type: 'material' }}
      />
      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ name: 'email', type: 'material' }}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        leftIcon={{ name: 'lock', type: 'material' }}
      />
      <ErrorMessage message={error || ''} />
      {loading ? <Loading /> : <Button title="Cadastrar" onPress={handleRegister} />}
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AUTH.LOGIN as never)}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
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
  link: {
    color: '#1976D2',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: 'bold',
  },
});
