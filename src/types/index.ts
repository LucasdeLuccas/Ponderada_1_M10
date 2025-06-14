export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  photo?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  team: string;
  image: string;
  stock: number;
  condition: ProductCondition;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export enum ProductCategory {
  SHIRTS = 'Camisas',
  SHOES = 'Chuteiras',
  BALLS = 'Bolas',
  ACCESSORIES = 'Acessórios',
}

export enum ProductCondition {
  NEW = 'Novo',
  LIKE_NEW = 'Semi-novo',
  GOOD = 'Bom',
  FAIR = 'Regular',
  POOR = 'Ruim',
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export enum NotificationType {
  NEW_PRODUCT = 'NEW_PRODUCT',
  PRICE_CHANGE = 'PRICE_CHANGE',
  FAVORITE_UPDATE = 'FAVORITE_UPDATE',
  SYSTEM = 'SYSTEM',
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ProductFilters {
  category?: ProductCategory;
  team?: string;
  condition?: ProductCondition;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface NotificationState {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProductFilter {
  search: string;
  category: ProductCategory | '';
  team: string;
  minPrice: number | '';
  maxPrice: number | '';
}

export interface ProductCategoryOption {
  id: string;
  name: ProductCategory;
}

export interface ProductTeamOption {
  id: string;
  name: string;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;
}
