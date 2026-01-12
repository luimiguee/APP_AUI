<?php
// Configuração de Banco de Dados
// Este arquivo contém as configurações de conexão com o banco de dados

// Carregar variáveis de ambiente se existir arquivo .env
if (file_exists(__DIR__ . '/../.env.php')) {
    require_once __DIR__ . '/../.env.php';
}

// Configurações do banco de dados
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'studyflow');

// Configurações da aplicação
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'seu_secret_jwt_aqui_mude_em_producao');
define('API_URL', getenv('API_URL') ?: 'http://localhost:8000/api');

?>

