import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card as RNECard, Text } from '@rneui/themed';
import { theme } from '../styles/theme';

interface CardProps {
  title: string;
  image: string;
  onPress?: () => void;
  containerStyle?: object;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, image, onPress, containerStyle, children }) => {
  const CardComponent = onPress ? TouchableOpacity : RNECard;

  return (
    <CardComponent onPress={onPress} style={[styles.container, containerStyle]}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    elevation: 2,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: theme.spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
  },
});
