import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './src/styles/theme';
import { AuthProvider, useAuthContext } from './src/contexts/AuthContext';
import { AuthStack } from './src/navigation/AuthStack';
import { MainStack } from './src/navigation/MainStack';
import { Loading } from './src/components/Loading';

const Routes: React.FC = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return <NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
