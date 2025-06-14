import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { Input, Button, ErrorMessage } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/constants';
import { theme } from '@/styles/theme';
import * as ImagePicker from 'expo-image-picker';
import { ProductCategory, ProductCondition } from '@/types';

const categories = Object.values(ProductCategory);
const conditions = Object.values(ProductCondition);

export const AddProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.SHIRTS);
  const [team, setTeam] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [condition, setCondition] = useState<ProductCondition>(ProductCondition.NEW);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setError('Precisamos de permissão para acessar a câmera');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      setError('Erro ao acessar a câmera');
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validação básica
      if (!name || !description || !price || !team || !stock || !image) {
        setError('Preencha todos os campos');
        return;
      }

      // Aqui você implementaria a lógica para salvar o produto
      // Por enquanto, apenas simulamos um delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigation.goBack();
    } catch (err) {
      setError('Erro ao salvar o produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
          </View>
        )}
        <Button title="Tirar Foto" onPress={handleTakePhoto} containerStyle={styles.imageButton} />
      </View>

      <Input
        placeholder="Nome do produto"
        value={name}
        onChangeText={setName}
        leftIcon={{ name: 'shopping', type: 'material' }}
      />
      <Input
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        leftIcon={{ name: 'description', type: 'material' }}
      />
      <Input
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        leftIcon={{ name: 'attach-money', type: 'material' }}
      />
      <Input
        placeholder="Time"
        value={team}
        onChangeText={setTeam}
        leftIcon={{ name: 'sports-soccer', type: 'material' }}
      />
      <Input
        placeholder="Estoque"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        leftIcon={{ name: 'inventory', type: 'material' }}
      />

      <Text style={styles.label}>Categoria</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {categories.map(cat => (
          <Button
            key={cat}
            title={cat}
            type={category === cat ? 'solid' : 'outline'}
            onPress={() => setCategory(cat as ProductCategory)}
            containerStyle={styles.chip}
          />
        ))}
      </ScrollView>
      <Text style={styles.label}>Condição</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {conditions.map(cond => (
          <Button
            key={cond}
            title={cond}
            type={condition === cond ? 'solid' : 'outline'}
            onPress={() => setCondition(cond as ProductCondition)}
            containerStyle={styles.chip}
          />
        ))}
      </ScrollView>

      {error && <ErrorMessage message={error} />}
      <Button title="Salvar" onPress={handleSave} loading={loading} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.grey3,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  placeholderText: {
    color: theme.colors.grey2,
    ...theme.typography.body,
  },
  imageButton: {
    width: '100%',
  },
  label: { fontWeight: 'bold', marginTop: 16, marginBottom: 4 },
  row: { flexDirection: 'row', marginBottom: 8 },
  chip: { marginRight: 8 },
});
