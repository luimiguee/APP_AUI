# 📊 Configuração do Banco de Dados - StudyFlow

Este guia explica como configurar o acesso ao banco de dados para o StudyFlow.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL/MariaDB instalado e rodando
- npm ou yarn

## 🚀 Instalação Rápida

### 1. Instalar Dependências do Backend

```bash
cd server
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do banco de dados:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=studyflow

API_PORT=3000
JWT_SECRET=seu_secret_jwt_aqui_mude_em_producao
```

### 3. Criar Banco de Dados

#### Opção A: Usando o Script SQL

```bash
mysql -u seu_usuario -p < server/database/schema.sql
```

#### Opção B: Usando o Script Node.js

```bash
cd server
npm run init-db
```

### 4. Iniciar o Servidor API

```bash
cd server
npm start
```

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 🔧 Estrutura do Banco de Dados

### Tabelas

1. **users** - Usuários do sistema
   - id, name, email, password, role, created_at, updated_at

2. **tasks** - Tarefas dos usuários
   - id, user_id, title, description, status, priority, due_date, created_at, updated_at

3. **activity_logs** - Logs de atividade
   - id, user_id, user_email, action, details, ip_address, created_at

## 🔌 Conexão com o Frontend

### Configurar a URL da API

No arquivo `js/api.js`, você pode configurar a URL da API:

```javascript
BASE_URL: 'http://localhost:3000/api'
```

Ou configure uma variável de ambiente se estiver usando um bundler.

### Migrar do localStorage para API

Para usar a API ao invés do localStorage, você precisa:

1. Incluir o arquivo `js/api.js` nas suas páginas HTML
2. Substituir chamadas do módulo `Auth` por `API` onde necessário
3. Exemplo:

```javascript
// Antes (localStorage)
Auth.login(email, password);

// Depois (API)
API.login(email, password);
```

## 🗄️ Outros Bancos de Dados

### PostgreSQL

1. Instalar dependências:
```bash
npm install pg
```

2. Atualizar `server/database/connection.js` para usar PostgreSQL
3. Adaptar o schema SQL para sintaxe PostgreSQL

### MongoDB

1. Instalar dependências:
```bash
npm install mongodb mongoose
```

2. Usar Mongoose ou driver nativo do MongoDB
3. Criar modelos ao invés de schema SQL

### SQLite

1. Instalar dependências:
```bash
npm install better-sqlite3
```

2. Usar SQLite para desenvolvimento/testes
3. Ideal para ambientes sem servidor de banco de dados

## 🔐 Segurança

⚠️ **Importante para Produção:**

1. **NUNCA** commite o arquivo `.env` no git
2. Use senhas fortes para o banco de dados
3. Use um `JWT_SECRET` forte e único
4. Configure HTTPS em produção
5. Use variáveis de ambiente no servidor de produção
6. Configure firewall e acesso restrito ao banco de dados

## 📝 Credenciais Padrão

Após a inicialização, os seguintes usuários estarão disponíveis:

### Administrador
- Email: `admin@studyflow.com`
- Senha: `admin123` (⚠️ altere em produção!)

### Estudante
- Email: `estudante@studyflow.com`
- Senha: `estudante123` (⚠️ altere em produção!)

**Nota:** As senhas precisam ser configuradas corretamente no script de inicialização usando bcrypt.

## 🐛 Troubleshooting

### Erro de Conexão

- Verifique se o MySQL está rodando: `mysql -u root -p`
- Verifique as credenciais no arquivo `.env`
- Verifique se o banco de dados existe
- Verifique se a porta está correta

### Erro de Autenticação

- Verifique se o JWT_SECRET está configurado
- Limpe o localStorage do navegador
- Verifique os logs do servidor

### Porta em Uso

- Mude a porta no arquivo `.env`
- Ou mate o processo usando a porta: `lsof -ti:3000 | xargs kill`

## 📚 Recursos Adicionais

- [Documentação MySQL](https://dev.mysql.com/doc/)
- [Documentação Express.js](https://expressjs.com/)
- [Documentação JWT](https://jwt.io/)

## 🆘 Suporte

Se encontrar problemas, verifique:
1. Logs do servidor (`console.log` no terminal)
2. Console do navegador (F12)
3. Network tab do navegador para ver requisições HTTP

