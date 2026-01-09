# StudyFlow - Plataforma de Gestão de Estudos

Uma aplicação web moderna e completa para gerenciar tarefas, testes, trabalhos e estudos. Desenvolvida com React, TypeScript e Tailwind CSS.

## 🎨 Design

- **Paleta de Cores:**
  - Primária: #4A90E2 (azul suave)
  - Secundária: #50E3C2 (verde suave)
  - Neutra: #F5F7FA (fundo), #333333 (texto), #AAAAAA (subtextos)
  - Alertas: #F5A623 (amarelo) para avisos, #D0021B (vermelho) para tarefas atrasadas

- **Tipografia:**
  - Fonte: Inter/Roboto (sem serifa)
  - Tamanhos: Cabeçalhos 24-32px, Subcabeçalhos 18-20px, Texto normal 14-16px

- **Características:**
  - Design minimalista e clean
  - Layout responsivo (desktop, tablet, mobile)
  - Tema claro/escuro personalizável
  - Configurações de tamanho de fonte
  - Personalização de cores do dashboard

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Registro
- ✅ Sistema completo de login e registro
- ✅ Logs de atividade (data, IP, ações)
- ✅ Envio simulado de email de confirmação
- ✅ Gestão de sessão com localStorage

### 👤 Perfil e Configurações (Estudante)
- ✅ Edição completa de perfil (nome, email, senha)
- ✅ Upload de foto de perfil (Base64)
- ✅ Configurações de tema (claro/escuro)
- ✅ Configurações de tamanho de fonte (pequeno, médio, grande)
- ✅ Personalização de cores do dashboard
- ✅ Preferências de categoria padrão
- ✅ Configurações de notificações

### 📊 Dashboard do Estudante
- ✅ Cards de estatísticas por categoria
- ✅ Barra de progresso geral
- ✅ Notificações de prazos próximos (3 dias)
- ✅ Calendário semanal interativo
- ✅ Lista de próximas tarefas
- ✅ Avisos de tarefas atrasadas

### 🛠️ Dashboard Administrativo
- ✅ Visão geral de todos os usuários e atividades
- ✅ Estatísticas globais (usuários, tarefas, concluídas, atrasadas)
- ✅ Gráficos por categoria e prioridade
- ✅ Filtro por usuário com barras de progresso
- ✅ Lista completa de todas as tarefas
- ✅ Capacidade de deletar tarefas de qualquer usuário
- ✅ Gestão de contas (criar, editar, eliminar)
- ✅ Logs de atividade (em desenvolvimento)
- ✅ Configurações globais (em desenvolvimento)

### 📋 Gestão de Tarefas
- ✅ Criar, editar, marcar como concluído e deletar tarefas
- ✅ Filtros por categoria, prioridade e status
- ✅ Visualização de tarefas atrasadas
- ✅ Categorias: Tarefa, Teste, Trabalho, Estudo
- ✅ Prioridades: Baixa, Média, Alta

### 📅 Calendário
- ✅ Visualização mensal e semanal
- ✅ Eventos coloridos por categoria
- ✅ Navegação entre meses
- ✅ Destaque para o dia atual

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ e npm/yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

## 👥 Credenciais de Demonstração

### Administrador
- Email: `admin@studyflow.com`
- Senha: `admin123`

### Estudante
- Email: `estudante@studyflow.com`
- Senha: `estudante123`

## 📁 Estrutura do Projeto

```
APP_AUI/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── context/          # Context API (Auth, Tasks, Settings, ActivityLogs)
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Serviços (email, etc)
│   ├── types/            # Tipos TypeScript
│   └── App.tsx           # Componente principal
├── package.json
└── README.md
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **date-fns** - Manipulação de datas
- **lucide-react** - Ícones

## 💾 Armazenamento

Os dados são armazenados localmente no navegador usando `localStorage`:
- `studyflow-user` - Usuário logado
- `studyflow-users` - Lista de usuários
- `studyflow-tasks` - Lista de tarefas
- `studyflow-activity-logs` - Logs de atividade
- `studyflow-settings-{userId}` - Configurações do usuário
- `studyflow-global-settings` - Configurações globais
- `studyflow-sent-emails` - Emails enviados (demonstração)

## 🔄 Funcionalidades em Desenvolvimento

- Visualização completa de logs de atividade para admin
- Página de configurações globais para admin
- Exportação de dados
- Integração com API real para emails
- Sistema de recuperação de senha

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.
