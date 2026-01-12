<?php
// API de Autenticação
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Lidar com OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/database.php';
require_once __DIR__ . '/jwt.php';

$db = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// Parse da URL para obter action
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$queryString = parse_url($requestUri, PHP_URL_QUERY);
parse_str($queryString ?? '', $queryParams);
$action = $queryParams['action'] ?? '';

// Roteamento
switch ($method) {
    case 'POST':
        if ($action === 'login') {
            handleLogin();
        } elseif ($action === 'register') {
            handleRegister();
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ação não encontrada']);
        }
        break;

    case 'GET':
        if ($action === 'me') {
            handleGetCurrentUser();
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Ação não encontrada']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
}

function handleLogin() {
    global $db;
    
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'E-mail e palavra-passe são obrigatórios']);
        return;
    }

    $user = $db->fetchOne(
        'SELECT * FROM users WHERE email = ?',
        [$email]
    );

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Credenciais inválidas']);
        return;
    }

    // Gerar token JWT
    $token = JWT::encode([
        'id' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role']
    ]);

    // Remover senha da resposta
    unset($user['password']);

    // Adicionar log de atividade
    $db->execute(
        'INSERT INTO activity_logs (user_id, user_email, action, details) VALUES (?, ?, ?, ?)',
        [$user['id'], $user['email'], 'Login', 'Utilizador fez login no sistema']
    );

    echo json_encode([
        'success' => true,
        'token' => $token,
        'user' => $user
    ]);
}

function handleRegister() {
    global $db;
    
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Nome, e-mail e palavra-passe são obrigatórios']);
        return;
    }

    // Verificar se email já existe
    $existing = $db->fetchOne('SELECT id FROM users WHERE email = ?', [$email]);
    if ($existing) {
        http_response_code(400);
        echo json_encode(['error' => 'Este e-mail já está registado']);
        return;
    }

    // Hash da senha
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Criar usuário
    $db->execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [$name, $email, $hashedPassword, 'estudante']
    );

    $userId = $db->lastInsertId();
    $user = $db->fetchOne('SELECT * FROM users WHERE id = ?', [$userId]);

    // Gerar token
    $token = JWT::encode([
        'id' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role']
    ]);

    // Adicionar log
    $db->execute(
        'INSERT INTO activity_logs (user_id, user_email, action, details) VALUES (?, ?, ?, ?)',
        [$userId, $email, 'Registo', 'Novo utilizador registado']
    );

    unset($user['password']);

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'token' => $token,
        'user' => $user
    ]);
}

function handleGetCurrentUser() {
    global $db;
    
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Token não fornecido']);
        return;
    }

    try {
        $payload = JWT::decode($token);
        $user = $db->fetchOne(
            'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
            [$payload['id']]
        );

        if (!$user) {
            http_response_code(404);
            echo json_encode(['error' => 'Utilizador não encontrado']);
            return;
        }

        echo json_encode(['user' => $user]);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Token inválido']);
    }
}

function getBearerToken() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        return $matches[1];
    }
    
    return null;
}

function verifyToken() {
    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Token não fornecido']);
        exit();
    }

    try {
        return JWT::decode($token);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Token inválido']);
        exit();
    }
}

?>

