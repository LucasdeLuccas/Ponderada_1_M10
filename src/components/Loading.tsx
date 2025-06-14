import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';

export const Loading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
