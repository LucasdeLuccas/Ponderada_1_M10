# FutStore - App de Artigos de Futebol

Aplicativo mobile desenvolvido em React Native para venda de artigos de futebol, com foco em torcedores de times brasileiros (especialmente Palmeiras) e times europeus.

## 🚀 Funcionalidades

- 🔐 Autenticação completa (Login, Cadastro, Reset de Senha com OTP)
- 🏪 Listagem de produtos com rolagem infinita (10.000 itens)
- 📸 Upload e visualização de fotos usando a câmera
- 📤 Compartilhamento de imagens
- 🔔 Sistema de notificações in-app
- 👤 Perfil do usuário com edição de dados
- ⭐ Sistema de favoritos
- 🔍 Filtros de busca

## 🛠️ Tecnologias Utilizadas

- React Native com Expo
- TypeScript
- React Navigation
- React Native Elements (UI Components)
- AsyncStorage/SecureStore
- Expo Camera
- Expo Notifications
- Faker.js (para dados mockados)

## 📱 Telas

1. **Autenticação**

   - Login
   - Cadastro
   - Reset de Senha (OTP)

2. **Home**

   - Lista de produtos com rolagem infinita
   - Filtros de busca
   - Barra de pesquisa

3. **Detalhes do Produto**

   - Imagem do produto
   - Informações detalhadas
   - Botão de favoritar
   - Compartilhar

4. **Adicionar Produto**

   - Upload de foto (câmera/galeria)
   - Formulário de cadastro

5. **Perfil**

   - Visualização de dados
   - Edição de informações
   - Alteração de senha
   - Upload de foto de perfil

6. **Notificações**
   - Lista de notificações
   - Marcar como lida

## 🚀 Como Executar

1. Clone o repositório

```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências

```bash
npm install
```

3. Execute o projeto

```bash
# Para iOS
npm run ios

# Para Android
npm run android

# Para Web
npm run web
```

## 📦 Estrutura do Projeto

```
src/
  ├── assets/        # Imagens, fontes e outros recursos
  ├── components/    # Componentes reutilizáveis
  ├── constants/     # Constantes e configurações
  ├── hooks/         # Custom hooks
  ├── navigation/    # Configuração de navegação
  ├── screens/       # Telas do aplicativo
  ├── services/      # Serviços e APIs
  ├── styles/        # Estilos globais
  ├── types/         # Definições de tipos TypeScript
  └── utils/         # Funções utilitárias
```

## Vídeo de Demonstração

📺 [Assista ao vídeo no YouTube](https://youtu.be/UzvZsdXXfUs)


## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
