import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainStack';
import { useProducts } from '../hooks/useProducts';
import { ProductFilters } from '../components/ProductFilters';
import { Card } from '../components/Card';
import { ErrorMessage } from '../components/ErrorMessage';
import { theme } from '../styles/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [showFilters, setShowFilters] = useState(false);

  const {
    products,
    categories,
    teams,
    filters,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    onFilterChange,
    onClearFilters,
  } = useProducts();

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const renderProduct = ({ item }: { item: any }) => (
    <Card
      title={item.name}
      image={item.image}
      onPress={() => handleProductPress(item.id)}
      containerStyle={styles.card}
    >
      <View style={styles.cardContent}>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </Card>
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Carregando mais produtos...</Text>
      </View>
    );
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={refresh} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FutStore</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
          <Icon
            name={showFilters ? 'filter-list-off' : 'filter-list'}
            type="material-community"
            color={theme.colors.primary}
            size={24}
          />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <ProductFilters
          categories={categories}
          teams={teams}
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={loading}
        onRefresh={refresh}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
            </View>
          ) : null
        }
      />

      <Button
        icon={<Icon name="plus" type="material-community" color={theme.colors.white} size={24} />}
        title="Adicionar Produto"
        onPress={handleAddProduct}
        buttonStyle={styles.addButton}
        containerStyle={styles.addButtonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  filterButton: {
    padding: theme.spacing.sm,
  },
  list: {
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  cardContent: {
    marginTop: theme.spacing.sm,
  },
  price: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  category: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
  footer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  footerText: {
    ...theme.typography.caption,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
});
