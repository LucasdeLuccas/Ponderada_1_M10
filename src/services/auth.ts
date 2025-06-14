import { User, LoginCredentials, RegisterData } from '../types';

const now = new Date().toISOString();

const users: User[] = [
  {
    id: '1',
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    password: '123456',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: now,
    updatedAt: now,
  },
];

// Simulando um token JWT
const generateToken = (user: User): string => {
  return `fake-jwt-token-${user.id}-${Date.now()}`;
};

// Simulando um delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(1000);

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    const token = generateToken(user);
    return { user, token };
  },

  async register(data: RegisterInput): Promise<{ user: User; token: string }> {
    await delay(1000);

    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const now = new Date().toISOString();
    const newUser: User = {
      id: String(users.length + 1),
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: `https://i.pravatar.cc/150?img=${users.length + 1}`,
      createdAt: now,
      updatedAt: now,
    };

    users.push(newUser);
    const token = generateToken(newUser);
    return { user: newUser, token };
  },

  async forgotPassword(email: string): Promise<void> {
    await delay(1000);

    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Email não encontrado');
    }

    console.log(`Link de recuperação enviado para ${email}`);
  },

  async resetPassword(email: string, newPassword: string): Promise<void> {
    await delay(1000);

    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Email não encontrado');
    }

    user.password = newPassword;
  },

  async validateToken(token: string): Promise<User | null> {
    await delay(500);

    const userId = token.split('-')[2];
    const user = users.find(u => u.id === userId);
    return user || null;
  },
};
