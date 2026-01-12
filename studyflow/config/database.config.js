// Configuração de Banco de Dados
// Este arquivo contém as configurações de conexão com o banco de dados

const dbConfig = {
  // MySQL/MariaDB
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'studyflow',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
  },

  // PostgreSQL
  postgres: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'studyflow',
    max: 10, // máximo de conexões no pool
    idleTimeoutMillis: 30000
  },

  // MongoDB
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/studyflow',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  // SQLite (para desenvolvimento/testes)
  sqlite: {
    filename: process.env.DB_FILE || './database/studyflow.db'
  }
};

// Escolha qual banco de dados usar
// Opções: 'mysql', 'postgres', 'mongodb', 'sqlite'
const DB_TYPE = process.env.DB_TYPE || 'mysql';

module.exports = {
  dbConfig,
  DB_TYPE
};

