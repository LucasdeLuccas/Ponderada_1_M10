import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { ProductCategory, ProductFilter } from '../types';
import { theme } from '../styles/theme';

interface ProductFiltersProps {
  categories: { id: ProductCategory; name: string }[];
  teams: string[];
  filters: ProductFilter;
  onFilterChange: (filters: ProductFilter) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  teams,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [search, setSearch] = useState(filters.search || '');
  const [minPrice, setMinPrice] = useState(
    filters.minPrice !== undefined ? filters.minPrice.toString() : ''
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice !== undefined ? filters.maxPrice.toString() : ''
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    onFilterChange({ ...filters, search: text });
  };

  const handleMinPriceChange = (text: string) => {
    setMinPrice(text);
    const value = text ? parseFloat(text) : '';
    onFilterChange({ ...filters, minPrice: value });
  };

  const handleMaxPriceChange = (text: string) => {
    setMaxPrice(text);
    const value = text ? parseFloat(text) : '';
    onFilterChange({ ...filters, maxPrice: value });
  };

  const handleCategorySelect = (category: ProductCategory) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? '' : category,
    });
  };

  const handleTeamSelect = (team: string) => {
    onFilterChange({
      ...filters,
      team: filters.team === team ? '' : team,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Buscar produtos..."
        value={search}
        onChangeText={handleSearch}
        leftIcon={{ type: 'material', name: 'search' }}
        containerStyle={styles.inputContainer}
      />

      <View style={styles.priceContainer}>
        <Input
          placeholder="Preço mínimo"
          value={minPrice}
          onChangeText={handleMinPriceChange}
          keyboardType="numeric"
          leftIcon={{ type: 'material', name: 'attach-money' }}
          containerStyle={[styles.inputContainer, styles.priceInput]}
        />
        <Input
          placeholder="Preço máximo"
          value={maxPrice}
          onChangeText={handleMaxPriceChange}
          keyboardType="numeric"
          leftIcon={{ type: 'material', name: 'attach-money' }}
          containerStyle={[styles.inputContainer, styles.priceInput]}
        />
      </View>

      <Text h4 style={styles.sectionTitle}>
        Categorias
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(category => (
          <Button
            key={String(category.id)}
            title={String(category.name)}
            type={filters.category === category.id ? 'solid' : 'outline'}
            onPress={() => handleCategorySelect(category.id)}
            containerStyle={styles.categoryButton}
          />
        ))}
      </ScrollView>

      <Text h4 style={styles.sectionTitle}>
        Times
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teamsContainer}>
        {teams.map(team => (
          <Button
            key={team}
            title={team}
            type={filters.team === team ? 'solid' : 'outline'}
            onPress={() => handleTeamSelect(team)}
            containerStyle={styles.teamButton}
          />
        ))}
      </ScrollView>

      <Button
        title="Limpar Filtros"
        type="outline"
        onPress={onClearFilters}
        containerStyle={styles.clearButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInput: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  sectionTitle: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  categoryButton: {
    marginRight: theme.spacing.sm,
  },
  teamsContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  teamButton: {
    marginRight: theme.spacing.sm,
  },
  clearButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
});
