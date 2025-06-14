import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { theme } from '../styles/theme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Button
          title="Tentar novamente"
          onPress={onRetry}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    ...theme.typography.body,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
