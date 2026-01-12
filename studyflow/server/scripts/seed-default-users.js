// Script para inserir usuários padrão no banco de dados
const bcrypt = require('bcryptjs');
const { query } = require('../database/connection');

async function seedDefaultUsers() {
  try {
    console.log('🌱 Inserindo usuários padrão...');

    // Verificar se usuários já existem
    const existingUsers = await query('SELECT email FROM users WHERE email IN (?, ?)', [
      'admin@studyflow.com',
      'estudante@studyflow.com'
    ]);

    const existingEmails = existingUsers.map(u => u.email);

    // Hash das senhas
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const estudantePasswordHash = await bcrypt.hash('estudante123', 10);

    // Inserir admin
    if (!existingEmails.includes('admin@studyflow.com')) {
      await query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@studyflow.com', adminPasswordHash, 'admin']
      );
      console.log('✅ Usuário admin criado: admin@studyflow.com / admin123');
    } else {
      console.log('ℹ️  Usuário admin já existe');
    }

    // Inserir estudante
    if (!existingEmails.includes('estudante@studyflow.com')) {
      await query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Estudante Exemplo', 'estudante@studyflow.com', estudantePasswordHash, 'estudante']
      );
      console.log('✅ Usuário estudante criado: estudante@studyflow.com / estudante123');
    } else {
      console.log('ℹ️  Usuário estudante já existe');
    }

    console.log('✅ Usuários padrão configurados!');
  } catch (error) {
    console.error('❌ Erro ao inserir usuários padrão:', error.message);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  require('dotenv').config();
  const { testConnection } = require('../database/connection');
  
  testConnection()
    .then(() => seedDefaultUsers())
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { seedDefaultUsers };

