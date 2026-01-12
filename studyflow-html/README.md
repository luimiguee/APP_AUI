# StudyFlow - Versão HTML/CSS/JavaScript

Esta é uma versão do StudyFlow criada usando apenas **HTML**, **CSS** e **JavaScript puro** (sem frameworks como React).

## 📁 Estrutura de Pastas

```
studyflow-html/
├── index.html          # Página inicial (Landing)
├── login.html          # Página de login
├── register.html       # Página de registro
├── dashboard.html      # Dashboard do estudante
├── css/
│   └── style.css       # Estilos globais
├── js/
│   ├── auth.js         # Sistema de autenticação
│   ├── tasks.js        # Sistema de tarefas
│   ├── activityLog.js  # Sistema de logs
│   ├── emailService.js # Serviço de email (simulado)
│   └── utils.js        # Utilitários
└── pages/
    ├── tarefas.html           # Página de tarefas
    ├── calendario.html        # Página de calendário
    ├── perfil.html            # Perfil do usuário
    ├── admin-dashboard.html   # Dashboard administrativo
    ├── admin-users.html       # Gestão de usuários
    ├── admin-logs.html        # Logs de atividade
    └── admin-settings.html    # Configurações globais
```

## 🚀 Como Usar

### Opção 1: Servidor Local Simples

Você pode abrir os arquivos HTML diretamente no navegador, mas algumas funcionalidades podem não funcionar devido às políticas de segurança do navegador (CORS). 

### Opção 2: Servidor PHP (Recomendado)

Se você tem PHP instalado:

```bash
cd studyflow-html
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

### Opção 3: Servidor Python

Se você tem Python instalado:

```bash
cd studyflow-html
python3 -m http.server 8000
```

Depois acesse: `http://localhost:8000`

## 📝 Funcionalidades

### ✅ Implementado

- ✅ Autenticação (Login/Registro)
- ✅ Dashboard do estudante
- ✅ Gestão de tarefas
- ✅ Calendário
- ✅ Perfil do usuário
- ✅ Dashboard administrativo
- ✅ Gestão de usuários (admin)
- ✅ Logs de atividade (admin)
- ✅ Tema claro/escuro (localStorage)
- ✅ Armazenamento local (localStorage)

### 📋 Notas

- Todos os dados são armazenados no `localStorage` do navegador
- Não há backend - tudo funciona no lado do cliente
- Os emails são simulados e salvos no localStorage
- Os logs de atividade são salvos localmente

## 🔐 Credenciais de Teste

### Administrador
- Email: `admin@studyflow.com`
- Senha: `admin123`

### Estudante
- Email: `estudante@studyflow.com`
- Senha: `estudante123`

## 🎨 Personalização

Os estilos podem ser personalizados editando `css/style.css`. As cores principais são definidas como variáveis CSS:

```css
:root {
  --primary: #4A90E2;
  --secondary: #50E3C2;
  --background: #F5F7FA;
  --text: #333333;
  --subtext: #AAAAAA;
}
```

## 📚 Arquitetura

### JavaScript

- **auth.js**: Gerencia autenticação, login, registro, logout
- **tasks.js**: Gerencia tarefas (CRUD completo)
- **activityLog.js**: Sistema de logs de atividade
- **emailService.js**: Serviço simulado de emails
- **utils.js**: Funções utilitárias (formatação, navegação, etc)

### Dados Armazenados (localStorage)

- `studyflow-user`: Usuário atual logado
- `studyflow-users`: Lista de usuários
- `studyflow-tasks`: Lista de tarefas
- `studyflow-activity-logs`: Logs de atividade
- `studyflow-sent-emails`: Emails enviados (simulado)

## 🔄 Próximos Passos

Para converter em uma aplicação com backend real, você precisaria:

1. Criar APIs REST (PHP, Node.js, Python, etc)
2. Substituir chamadas ao localStorage por chamadas HTTP
3. Implementar autenticação real (JWT, sessions)
4. Configurar banco de dados (MySQL, PostgreSQL, MongoDB)
5. Implementar serviço real de emails

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

