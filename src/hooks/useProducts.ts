import { useState, useCallback } from 'react';
import {
  Product,
  ProductCategory,
  ProductFilter,
  ProductCategoryOption,
  ProductTeamOption,
  ProductCondition,
} from '../types';
import { productsService } from '../services/products';

const ITEMS_PER_PAGE = 10;

const mockCategories: ProductCategoryOption[] = [
  { id: '1', name: ProductCategory.SHIRTS },
  { id: '2', name: ProductCategory.SHOES },
  { id: '3', name: ProductCategory.BALLS },
  { id: '4', name: ProductCategory.ACCESSORIES },
];

const mockTeams: ProductTeamOption[] = [
  { id: '1', name: 'Palmeiras' },
  { id: '2', name: 'São Paulo' },
  { id: '3', name: 'Santos' },
  { id: '4', name: 'Corinthians' },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camisa Palmeiras 2024',
    description: 'Camisa oficial do Palmeiras temporada 2024',
    price: 299.9,
    category: ProductCategory.SHIRTS,
    team: 'Palmeiras',
    image: 'https://example.com/palmeiras-2024.jpg',
    images: ['https://example.com/palmeiras-2024.jpg'],
    stock: 10,
    condition: ProductCondition.NEW,
    seller: {
      id: '1',
      name: 'Loja Oficial Palmeiras',
      rating: 4.8,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Chuteira Nike Mercurial',
    description: 'Chuteira Nike Mercurial Superfly 8',
    price: 899.9,
    category: ProductCategory.SHOES,
    team: 'Nike',
    image: 'https://example.com/mercurial.jpg',
    images: ['https://example.com/mercurial.jpg'],
    stock: 5,
    condition: ProductCondition.NEW,
    seller: {
      id: '2',
      name: 'Nike Store',
      rating: 4.9,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<ProductCategoryOption[]>(mockCategories);
  const [teams] = useState<ProductTeamOption[]>(mockTeams);
  const [filters, setFilters] = useState<ProductFilter>({
    search: '',
    category: '',
    team: '',
    minPrice: '',
    maxPrice: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const onFilterChange = useCallback((newFilters: ProductFilter) => {
    setFilters(newFilters);
    setPage(1);
    setProducts([]);
    loadMore();
  }, []);

  const onClearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      team: '',
      minPrice: '',
      maxPrice: '',
    });
    setPage(1);
    setProducts(mockProducts);
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        const filteredProducts = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
          const matchesCategory = !filters.category || product.category === filters.category;
          const matchesTeam = !filters.team || product.team === filters.team;
          const matchesMinPrice = !filters.minPrice || product.price >= filters.minPrice;
          const matchesMaxPrice = !filters.maxPrice || product.price <= filters.maxPrice;

          return (
            matchesSearch && matchesCategory && matchesTeam && matchesMinPrice && matchesMaxPrice
          );
        });

        setProducts(prevProducts => [...prevProducts, ...filteredProducts]);
        setHasMore(page < 3);
        setPage(prevPage => prevPage + 1);
      } catch (err) {
        setError('Erro ao carregar produtos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [loading, hasMore, filters, page, products]);

  const refresh = useCallback(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    loadMore();
  }, [loadMore]);

  return {
    products,
    categories,
    teams,
    filters,
    loading,
    error,
    hasMore,
    onFilterChange,
    onClearFilters,
    loadMore,
    refresh,
  };
};
