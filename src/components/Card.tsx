import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from '@rneui/themed';
import { theme } from '../styles/theme';

interface CardProps {
  title: string;
  image?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, image, onPress, containerStyle, children }) => {
  const content = (
    <View style={[styles.card, containerStyle]}>
      {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ width: '100%' }}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.grey3,
  },
  title: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
  },
  content: {
    marginTop: theme.spacing.xs,
  },
});
