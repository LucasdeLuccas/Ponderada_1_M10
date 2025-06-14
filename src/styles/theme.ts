import { DefaultTheme } from '@react-navigation/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#5856D6',
    border: '#C6C6C8',
    notification: '#FF3B30',
    card: '#FFFFFF',
    white: '#FFFFFF',
    black: '#000000',
    grey1: '#8E8E93',
    grey2: '#C6C6C8',
    grey3: '#E5E5EA',
    grey4: '#F2F2F7',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    caption: {
      fontSize: 14,
      color: '#8E8E93',
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme;
