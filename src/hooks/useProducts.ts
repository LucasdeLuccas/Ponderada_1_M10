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
    image:
      'https://static.allianzparqueshop.com.br/produtos/camisa-palmeiras-i-2425-sn-torcedor-puma-masculina/60/PI3-1918-060/PI3-1918-060_zoom1.jpg?ts=1711145907&ims=544x',
    images: [
      'https://static.allianzparqueshop.com.br/produtos/camisa-palmeiras-i-2425-sn-torcedor-puma-masculina/60/PI3-1918-060/PI3-1918-060_zoom1.jpg?ts=1711145907&ims=544x',
    ],
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
    image:
      'https://images.tcdn.com.br/img/img_prod/628041/chuteira_nike_mercurial_superfly_9_club_campo_branco_azul_23535_1_7032a62a6139aa3d9d11cd79b46ca37b.png',
    images: [
      'https://images.tcdn.com.br/img/img_prod/628041/chuteira_nike_mercurial_superfly_9_club_campo_branco_azul_23535_1_7032a62a6139aa3d9d11cd79b46ca37b.png',
    ],
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
  {
    id: '3',
    name: 'Camisa Flamengo 2024',
    description: 'Camisa oficial do Flamengo temporada 2024',
    price: 299.9,
    category: ProductCategory.SHIRTS,
    team: 'Flamengo',
    image: 'https://leader.jetassets.com.br/produto/67dc7a5a9602a_produto_foto01.jpg',
    images: ['https://leader.jetassets.com.br/produto/67dc7a5a9602a_produto_foto01.jpg'],
    stock: 50,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Camisa Barcelona 2024',
    description: 'Camisa oficial do Barcelona temporada 2024',
    price: 399.9,
    category: ProductCategory.SHIRTS,
    team: 'Barcelona',
    image:
      'https://acdn-us.mitiendanube.com/stores/002/322/390/products/camisa-barcelona-01-b90c1e0d94693c8fc117449291867995-1024-1024.jpeg',
    images: [
      'https://acdn-us.mitiendanube.com/stores/002/322/390/products/camisa-barcelona-01-b90c1e0d94693c8fc117449291867995-1024-1024.jpeg',
    ],
    stock: 30,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Bola Nike Premier League',
    description: 'Bola oficial da Premier League',
    price: 199.9,
    category: ProductCategory.ACCESSORIES,
    team: 'Premier League',
    image: 'https://imgnike-a.akamaihd.net/1300x1300/07383553A1.jpg',
    images: ['https://imgnike-a.akamaihd.net/1300x1300/07383553A1.jpg'],
    stock: 100,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
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
