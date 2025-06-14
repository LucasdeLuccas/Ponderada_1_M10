import {
  Product,
  ProductCategory,
  ProductFilter,
  ProductCategoryOption,
  ProductCondition,
} from '../types';

const products: Product[] = [
  {
    id: '1',
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
    id: '2',
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
    stock: 45,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
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
    id: '4',
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
  {
    id: '5',
    name: 'Chuteira Nike Mercurial',
    description: 'Chuteira Nike Mercurial Superfly',
    price: 899.9,
    category: ProductCategory.SHOES,
    team: 'Nike',
    image:
      'https://images.tcdn.com.br/img/img_prod/628041/chuteira_nike_mercurial_superfly_9_club_campo_branco_azul_23535_1_7032a62a6139aa3d9d11cd79b46ca37b.png',
    images: [
      'https://images.tcdn.com.br/img/img_prod/628041/chuteira_nike_mercurial_superfly_9_club_campo_branco_azul_23535_1_7032a62a6139aa3d9d11cd79b46ca37b.png',
    ],
    stock: 25,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Camisa Palmeiras 2023',
    description: 'Camisa oficial do Palmeiras temporada 2023',
    price: 349.9,
    category: ProductCategory.SHIRTS,
    team: 'Palmeiras',
    image:
      'https://dcdn-us.mitiendanube.com/stores/002/936/375/products/e5470d881-bfb52644fecd35c89f16796078299371-1024-1024.jpg',
    images: [
      'https://dcdn-us.mitiendanube.com/stores/002/936/375/products/e5470d881-bfb52644fecd35c89f16796078299371-1024-1024.jpg',
    ],
    stock: 40,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Camisa Palmeiras Retro 1999',
    description: 'Camisa retrô do Palmeiras, modelo 1999, patrocinador Parmalat',
    price: 399.9,
    category: ProductCategory.SHIRTS,
    team: 'Palmeiras',
    image:
      'https://acdn-us.mitiendanube.com/stores/002/935/203/products/camisa-retro-palmeiras-1999-1998-parmalat-rhumells-rumell-alex-dejair-mundial-libertadores-1-1044f45f09e51c864a17285648779157-1024-1024.jpeg',
    images: [
      'https://acdn-us.mitiendanube.com/stores/002/935/203/products/camisa-retro-palmeiras-1999-1998-parmalat-rhumells-rumell-alex-dejair-mundial-libertadores-1-1044f45f09e51c864a17285648779157-1024-1024.jpeg',
    ],
    stock: 20,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Camisa Corinthians 2015',
    description: 'Camisa oficial do Corinthians temporada 2015',
    price: 299.9,
    category: ProductCategory.SHIRTS,
    team: 'Corinthians',
    image:
      'https://s2.glbimg.com/FIcsxuB85S_JZU52U8_qlOSmoNB-FHAxG2ap0lDsQI9NxCnVrnc3v8zJCGzMHz-0/i.glbimg.com/og/ig/infoglobo1/f/original/2015/07/20/112754-corintia.jpg',
    images: [
      'https://s2.glbimg.com/FIcsxuB85S_JZU52U8_qlOSmoNB-FHAxG2ap0lDsQI9NxCnVrnc3v8zJCGzMHz-0/i.glbimg.com/og/ig/infoglobo1/f/original/2015/07/20/112754-corintia.jpg',
    ],
    stock: 35,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Camisa Corinthians 2023',
    description: 'Camisa oficial do Corinthians temporada 2023',
    price: 349.9,
    category: ProductCategory.SHIRTS,
    team: 'Corinthians',
    image:
      'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/wp-content-galerias/uploads/2023/09/Corinthians-4.jpeg',
    images: [
      'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/wp-content-galerias/uploads/2023/09/Corinthians-4.jpeg',
    ],
    stock: 28,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Camisa Fluminense 2021',
    description: 'Camisa oficial do Fluminense, uma das mais bonitas do Brasil em 2021',
    price: 329.9,
    category: ProductCategory.SHIRTS,
    team: 'Fluminense',
    image:
      'https://cdn.manualdohomem.com.br/?w=700&h=700&key=aHR0cHM6Ly9tYW51YWxkb2hvbWVtbW9kZXJuby5jb20uYnI=&u=%2Ffiles%2F2021%2F07%2F11-camisas-mais-bonitas-de-times-brasileiros-em-2021-11-camisas-mais-bonitas-de-times-brasileiros-em-2021-2.jpg',
    images: [
      'https://cdn.manualdohomem.com.br/?w=700&h=700&key=aHR0cHM6Ly9tYW51YWxkb2hvbWVtbW9kZXJuby5jb20uYnI=&u=%2Ffiles%2F2021%2F07%2F11-camisas-mais-bonitas-de-times-brasileiros-em-2021-11-camisas-mais-bonitas-de-times-brasileiros-em-2021-2.jpg',
    ],
    stock: 22,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Camisa Palmeiras 1989',
    description: 'Camisa retrô do Palmeiras, modelo 1989',
    price: 299.9,
    category: ProductCategory.SHIRTS,
    team: 'Palmeiras',
    image:
      'https://img.clasf.com.br/2020/06/24/camisa-palmeiras-1989-20200624051650.1160310015.jpg',
    images: [
      'https://img.clasf.com.br/2020/06/24/camisa-palmeiras-1989-20200624051650.1160310015.jpg',
    ],
    stock: 15,
    condition: ProductCondition.NEW,
    seller: { id: '1', name: 'FutStore', rating: 5 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productsService = {
  async getProducts(
    page = 1,
    limit = 10,
    filters?: ProductFilter
  ): Promise<{ products: Product[]; total: number }> {
    await delay(1000);

    let filteredProducts = [...products];

    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      if (filters.team) {
        filteredProducts = filteredProducts.filter(p => p.team === filters.team);
      }
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= Number(filters.maxPrice));
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
      }
    }

    const total = filteredProducts.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = filteredProducts.slice(start, end);

    return { products: paginatedProducts, total };
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(500);
    return products.find(p => p.id === id) || null;
  },

  async getCategories(): Promise<ProductCategoryOption[]> {
    await delay(500);
    const categories = Array.from(new Set(products.map(p => p.category)));
    return categories.map(category => ({
      id: category as ProductCategory,
      name: (category.charAt(0).toUpperCase() + category.slice(1)) as ProductCategory,
    }));
  },

  async getTeams(): Promise<string[]> {
    await delay(500);
    return Array.from(new Set(products.map(p => p.team)));
  },

  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    await delay(1000);

    const newProduct: Product = {
      ...product,
      id: String(products.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await delay(1000);

    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updatedProduct;
    return updatedProduct;
  },

  async deleteProduct(id: string): Promise<boolean> {
    await delay(1000);

    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  },
};
