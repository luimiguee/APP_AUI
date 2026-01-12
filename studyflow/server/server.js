// Servidor API StudyFlow
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { testConnection } = require('./database/connection');
const { router: authRouter } = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.API_PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

// Rota de saúde
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'StudyFlow API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      tasks: '/api/tasks',
      health: '/api/health'
    }
  });
});

// Iniciar servidor
async function startServer() {
  // Testar conexão com banco de dados
  await testConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor API rodando em http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch(console.error);

