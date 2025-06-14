import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, Divider, Button } from '@/components';
import { Product, ProductCategory, ProductCondition } from '@/types';
import { MOCK_PRODUCTS } from './HomeScreen';

// Defina o tipo dos parâmetros de navegação
interface ProductDetailsParams {
  productId: string;
}

type ProductDetailsRouteProp = RouteProp<{ params: ProductDetailsParams }, 'params'>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const product = MOCK_PRODUCTS.find((p: Product) => p.id === productId);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.card}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Divider />
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.text}>{product.description}</Text>
        <Divider />
        <Text style={styles.label}>
          Categoria: <Text style={styles.text}>{product.category}</Text>
        </Text>
        <Text style={styles.label}>
          Condição: <Text style={styles.text}>{product.condition}</Text>
        </Text>
        <Text style={styles.label}>
          Time: <Text style={styles.text}>{product.team}</Text>
        </Text>
        <Button
          title={product.isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
          type={product.isFavorite ? 'outline' : 'solid'}
          containerStyle={{ marginTop: 16 }}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  card: { borderRadius: 12, padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 8, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  price: { fontSize: 20, color: '#1976D2', marginBottom: 12, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 8 },
  text: { fontSize: 16, marginBottom: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
