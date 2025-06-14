import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Button, ErrorMessage } from '@/components';
import { useAuthContext } from '@/contexts/AuthContext';
import { theme } from '@/styles/theme';
import * as ImagePicker from 'expo-image-picker';

export const ProfileScreen: React.FC = () => {
  const { user, signOut, loading, error, updateProfile } = useAuthContext();
  const [avatar, setAvatar] = useState(user?.avatar || null);

  const handleSelectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Precisamos de permissão para acessar a galeria');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const newAvatar = result.assets[0].uri;
        await updateProfile({ avatar: newAvatar });
        setAvatar(newAvatar);
      }
    } catch (err) {
      console.error('Erro ao selecionar imagem:', err);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.placeholderText}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <Text style={styles.changePhotoText}>Alterar foto</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {error && <ErrorMessage message={error} />}
      <Button
        title="Sair"
        onPress={signOut}
        loading={loading}
        disabled={loading}
        containerStyle={styles.signOutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.sm,
  },
  placeholderAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  placeholderText: {
    color: theme.colors.white,
    fontSize: 48,
    fontWeight: 'bold',
  },
  changePhotoText: {
    color: theme.colors.primary,
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  name: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.grey2,
  },
  signOutButton: {
    width: '100%',
  },
});
