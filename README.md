# Sistema de Gerenciamento de Eventos e Cartelas de Bingo

![Node.js](https://img.shields.io/badge/Node.js-v14.x+-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![EJS](https://img.shields.io/badge/View%20Engine-EJS-orange)

Sistema completo para gerenciamento de eventos e cartelas de bingo, com autenticação de usuários e CRUD para todas as entidades principais.

## Funcionalidades Principais

- ✅ Cadastro e autenticação de usuários
- ✅ CRUD completo para Eventos
- ✅ CRUD completo para Cartelas de Bingo
- ✅ Associação de cartelas a eventos específicos
- ✅ Sistema de autenticação com sessões
- ✅ Interface web com EJS

## Pré-requisitos

- Node.js v14.x ou superior
- MySQL 8.0 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Acesse a pasta do projeto:
```bash
cd [NOME_DA_PASTA_DO_PROJETO]
```

3. Instale as dependências:
```bash
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
PORT=8080
SESSION_SECRET=sua_chave_secreta
```

2. Crie o banco de dados e execute as migrações:
```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

## Executando o Servidor

Para iniciar o servidor em modo de desenvolvimento:
```bash
node index.js
```

O servidor estará disponível em: [http://localhost:8080](http://localhost:8080)

## Estrutura da API

### Rotas de Usuário (users)
- `POST /user/register` - Registrar novo usuário
- `POST /user/login` - Autenticar usuário
- `GET /user/logout` - Encerrar sessão

### Rotas de Eventos (events)
- `GET /events` - Listar todos os eventos
- `GET /events/:id` - Visualizar um evento específico
- `POST /events` - Criar novo evento (requer autenticação)
- `PUT /events/:id` - Atualizar evento (requer autenticação)
- `DELETE /events/:id` - Remover evento (requer autenticação)

### Rotas de Cartelas (bingocard)
- `GET /bingocard` - Listar todas as cartelas
- `GET /bingocard/:id` - Visualizar uma cartela específica
- `POST /bingocard` - Criar nova cartela (requer autenticação)
- `PUT /bingocard/:id` - Atualizar cartela (requer autenticação)
- `DELETE /bingocard/:id` - Remover cartela (requer autenticação)

## Estrutura do Projeto

```
├── config/
│   └── config.js        # Configurações do banco de dados
├── controllers/         # Lógica dos controllers
│   ├── bingocardController.js
│   ├── eventsController.js
│   └── userController.js
├── middlewares/         # Middlewares
│   └── auth.js         # Middleware de autenticação
├── migrations/          # Migrações do Sequelize
├── models/              # Modelos do Sequelize
├── public/              # Arquivos estáticos
├── routes/              # Definição de rotas
├── seeders/             # Seeders do Sequelize
├── views/               # Templates EJS
├── .env                 # Variáveis de ambiente
├── index.js             # Ponto de entrada da aplicação
└── package.json
```

## Dependências Principais

- **express**: Framework web
- **sequelize**: ORM para MySQL
- **ejs**: Template engine para views
- **express-session**: Gerenciamento de sessões
- **mysql2**: Driver MySQL para Node.js
- **dotenv**: Gerenciamento de variáveis de ambiente

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
