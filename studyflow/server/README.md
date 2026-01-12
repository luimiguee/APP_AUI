# 🚀 StudyFlow API Server

Servidor backend API para o StudyFlow, construído com Node.js e Express.

## 📋 Pré-requisitos

- Node.js 14+
- MySQL/MariaDB
- npm ou yarn

## 🔧 Instalação

1. **Instalar dependências:**

```bash
npm install
```

2. **Configurar variáveis de ambiente:**

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=studyflow
API_PORT=3000
JWT_SECRET=seu_secret_jwt_aqui
```

3. **Criar banco de dados:**

```bash
npm run setup
```

Isso irá:
- Criar o banco de dados e tabelas
- Inserir usuários padrão (admin/estudante)

Ou execute separadamente:

```bash
# Apenas criar estrutura
npm run init-db

# Apenas inserir usuários padrão
npm run seed-users
```

## 🚀 Executar

### Modo Produção:

```bash
npm start
```

### Modo Desenvolvimento (com auto-reload):

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/me` - Obter usuário atual (requer token)

### Tarefas

- `GET /api/tasks` - Listar tarefas do usuário (requer token)
- `GET /api/tasks/:id` - Obter tarefa por ID (requer token)
- `POST /api/tasks` - Criar tarefa (requer token)
- `PUT /api/tasks/:id` - Atualizar tarefa (requer token)
- `DELETE /api/tasks/:id` - Deletar tarefa (requer token)

### Saúde

- `GET /api/health` - Status da API e banco de dados

## 🔐 Autenticação

Todas as rotas protegidas requerem um token JWT no header:

```
Authorization: Bearer <token>
```

## 👤 Usuários Padrão

Após executar `npm run seed-users`, os seguintes usuários estarão disponíveis:

- **Admin**: `admin@studyflow.com` / `admin123`
- **Estudante**: `estudante@studyflow.com` / `estudante123`

⚠️ **IMPORTANTE**: Altere essas senhas em produção!

## 📁 Estrutura

```
server/
├── database/
│   ├── connection.js    # Conexão com banco de dados
│   └── schema.sql       # Schema SQL
├── routes/
│   ├── auth.js          # Rotas de autenticação
│   └── tasks.js         # Rotas de tarefas
├── scripts/
│   ├── init-database.js      # Script de inicialização
│   └── seed-default-users.js # Script de usuários padrão
├── server.js            # Servidor principal
└── package.json         # Dependências
```

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (10 rounds)
- Tokens JWT com expiração de 24h
- CORS configurado
- Validação de dados de entrada
- Proteção contra SQL injection (usando prepared statements)

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Verifique se o banco de dados existe

### Porta já em uso

Altere `API_PORT` no arquivo `.env` ou mate o processo:

```bash
lsof -ti:3000 | xargs kill
```

### Problemas com dependências

Limpe e reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentação

Para mais detalhes sobre configuração, consulte `DATABASE_SETUP.md` na raiz do projeto.

