export const APP_NAME = "FutStore";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "@FutStore:authToken",
  USER_DATA: "@FutStore:userData",
  FAVORITES: "@FutStore:favorites",
  NOTIFICATIONS: "@FutStore:notifications",
};

export const API_CONFIG = {
  BASE_URL: "https://jsonplaceholder.typicode.com", // URL mock para desenvolvimento
  TIMEOUT: 10000,
  ITEMS_PER_PAGE: 20,
};

export const TEAMS = {
  BRAZILIAN: [
    "Palmeiras",
    "São Paulo",
    "Santos",
    "Corinthians",
    "Flamengo",
    "Vasco",
    "Fluminense",
    "Botafogo",
    "Cruzeiro",
    "Atlético-MG",
    "Grêmio",
    "Internacional",
  ],
  EUROPEAN: [
    "Real Madrid",
    "Barcelona",
    "Manchester United",
    "Manchester City",
    "Liverpool",
    "Chelsea",
    "Arsenal",
    "Bayern Munich",
    "Borussia Dortmund",
    "PSG",
    "Juventus",
    "Milan",
    "Inter",
  ],
};

export const ROUTES = {
  AUTH: {
    LOGIN: "Login",
    REGISTER: "Register",
    FORGOT_PASSWORD: "ForgotPassword",
    RESET_PASSWORD: "ResetPassword",
  },
  MAIN: {
    HOME: "Home",
    PRODUCT_DETAILS: "ProductDetails",
    ADD_PRODUCT: "AddProduct",
    PROFILE: "Profile",
    NOTIFICATIONS: "Notifications",
  },
};

export const ERROR_MESSAGES = {
  GENERIC: "Ocorreu um erro. Tente novamente.",
  NETWORK: "Erro de conexão. Verifique sua internet.",
  AUTH: {
    INVALID_CREDENTIALS: "Email ou senha inválidos.",
    EMAIL_IN_USE: "Este email já está em uso.",
    WEAK_PASSWORD: "A senha deve ter pelo menos 6 caracteres.",
    INVALID_EMAIL: "Email inválido.",
    USER_NOT_FOUND: "Usuário não encontrado.",
  },
  PRODUCT: {
    NOT_FOUND: "Produto não encontrado.",
    INVALID_DATA: "Dados do produto inválidos.",
  },
};

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: "Login realizado com sucesso!",
    REGISTER: "Cadastro realizado com sucesso!",
    PASSWORD_RESET: "Senha alterada com sucesso!",
  },
  PRODUCT: {
    CREATED: "Produto criado com sucesso!",
    UPDATED: "Produto atualizado com sucesso!",
    DELETED: "Produto removido com sucesso!",
    FAVORITED: "Produto adicionado aos favoritos!",
    UNFAVORITED: "Produto removido dos favoritos!",
  },
  PROFILE: {
    UPDATED: "Perfil atualizado com sucesso!",
  },
};
