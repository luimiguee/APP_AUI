# 🧪 Guia de Testes - StudyFlow

## 📋 Pré-requisitos

Certifique-se de ter instalado:
- Node.js 18 ou superior
- npm ou yarn

## 🚀 Como Iniciar a Aplicação

### 1. Instalar Dependências
```bash
cd APP_AUI
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

## 👤 Credenciais de Teste

### Administrador
- **Email:** `admin@studyflow.com`
- **Senha:** `admin123`
- **Acesso:** Dashboard administrativo completo

### Estudante (Exemplo)
- **Email:** `estudante@studyflow.com`
- **Senha:** `estudante123`
- **Acesso:** Dashboard e funcionalidades do estudante

## 🧪 Cenários de Teste

### 1️⃣ Teste de Registro e Email

1. Acesse a página inicial (`http://localhost:5173`)
2. Clique em "Registar" ou "Criar Conta Grátis"
3. Preencha o formulário:
   - Nome: "João Silva"
   - Email: "joao@teste.com"
   - Senha: "123456"
   - Confirmar senha: "123456"
4. Clique em "Criar conta e enviar email"
5. **Verificar:**
   - ✅ Mensagem de sucesso aparece
   - ✅ Confirmação de email enviado aparece
   - ✅ Redirecionamento para dashboard após alguns segundos
   - ✅ Console do navegador mostra "📧 Email enviado"
   - ✅ Email salvo no localStorage (ver no DevTools)

### 2️⃣ Teste de Login

1. Vá para `/login`
2. Use credenciais:
   - **Admin:** admin@studyflow.com / admin123
   - **Estudante:** estudante@studyflow.com / estudante123
3. **Verificar:**
   - ✅ Login bem-sucedido
   - ✅ Redirecionamento para dashboard correto (admin ou estudante)
   - ✅ Log de atividade criado

### 3️⃣ Teste como Estudante

#### Dashboard
1. Faça login como estudante
2. Vá para `/dashboard`
3. **Verificar:**
   - ✅ Cards de estatísticas por categoria
   - ✅ Barra de progresso
   - ✅ Calendário semanal
   - ✅ Lista de próximas tarefas

#### Criar Tarefa
1. Vá para `/tarefas`
2. Clique em "Nova Tarefa"
3. Preencha:
   - Título: "Estudar React"
   - Categoria: "Estudo"
   - Prioridade: "Alta"
   - Data: (escolha uma data futura)
4. **Verificar:**
   - ✅ Tarefa criada e aparece na lista
   - ✅ Log de atividade registrado
   - ✅ Email simulado enviado (se habilitado)

#### Editar Perfil
1. Vá para `/perfil`
2. Clique em "Editar Perfil"
3. Altere nome ou adicione foto
4. **Verificar:**
   - ✅ Alterações salvas
   - ✅ Log de atividade registrado

#### Configurações
1. Vá para `/configuracoes`
2. Altere:
   - Tema (claro/escuro)
   - Tamanho de fonte
   - Cores do dashboard
3. Salve
4. **Verificar:**
   - ✅ Configurações aplicadas imediatamente
   - ✅ Persistem após refresh

### 4️⃣ Teste como Administrador

#### Dashboard Administrativo
1. Faça login como admin
2. Vá para `/admin/dashboard`
3. **Verificar:**
   - ✅ Estatísticas globais
   - ✅ Cards de ação rápida
   - ✅ Filtro por usuário funciona

#### Gestão de Usuários
1. Vá para `/admin/usuarios`
2. Clique em "Criar Usuário"
3. Preencha:
   - Nome: "Maria Santos"
   - Email: "maria@teste.com"
   - Senha: "123456"
   - Tipo: Estudante
4. **Verificar:**
   - ✅ Usuário criado
   - ✅ Email enviado automaticamente
   - ✅ Log de atividade criado
   - ✅ Aparece na lista de usuários

5. Teste edição:
   - Clique no ícone de editar ao lado de um usuário
   - Altere informações
   - **Verificar:** Alterações salvas

6. Teste eliminação:
   - Clique no ícone de deletar (não pode deletar próprio usuário)
   - **Verificar:** Usuário removido

#### Logs de Atividade
1. Vá para `/admin/logs`
2. **Verificar:**
   - ✅ Todos os logs aparecem
   - ✅ Filtros funcionam:
     - Por usuário
     - Por ação
     - Por período
     - Busca por texto
3. Teste exportação:
   - Clique em "Exportar CSV"
   - **Verificar:** Arquivo baixado

#### Configurações Globais
1. Vá para `/admin/configuracoes`
2. Altere:
   - Tema padrão
   - Cores padrão
   - Habilitar/desabilitar emails
   - Habilitar/desabilitar registro
3. Salve
4. **Verificar:**
   - ✅ Configurações salvas
   - ✅ Aplicadas em novos usuários

## 📧 Teste de Emails

### Verificar Emails Enviados
1. Abra DevTools (F12)
2. Vá para Console
3. Digite:
```javascript
JSON.parse(localStorage.getItem('studyflow-sent-emails'))
```
4. **Verificar:** Lista de todos os emails enviados aparece

### Testar Desabilitar Emails
1. Login como admin
2. Vá para `/admin/configuracoes`
3. Desabilite "Notificações por Email"
4. Crie uma nova conta
5. **Verificar:** Email não é enviado

## 📊 Teste de Logs

### Verificar Logs no Console
1. Abra DevTools (F12)
2. Vá para Application > Local Storage
3. Procure por `studyflow-activity-logs`
4. **Verificar:** Todos os logs aparecem em JSON

### Filtrar Logs
1. Login como admin
2. Vá para `/admin/logs`
3. Teste filtros:
   - Selecione um usuário específico
   - Selecione tipo de ação (ex: "Login")
   - Selecione período (ex: "Hoje")
   - Use busca por texto
4. **Verificar:** Logs filtrados corretamente

## 🎨 Teste de Design Responsivo

### Desktop
- Teste em resolução 1920x1080
- Verificar layout de 4 colunas nos cards
- Verificar navbar completa

### Tablet
- Redimensione janela para ~768px
- Verificar layout adapta para 2 colunas
- Verificar navbar ainda mostra itens principais

### Mobile
- Redimensione para ~375px
- Verificar layout em 1 coluna
- Verificar navbar colapsa (menu hamburger pode ser adicionado)
- Verificar botões e inputs são clicáveis

## 🔍 Teste de Funcionalidades Específicas

### Calendário
1. Vá para `/calendario`
2. **Verificar:**
   - ✅ Visualização mensal mostra tarefas
   - ✅ Visualização semanal mostra eventos
   - ✅ Trocar entre visualizações funciona
   - ✅ Navegação entre meses funciona
   - ✅ Dia atual destacado

### Filtros de Tarefas
1. Vá para `/tarefas`
2. Crie algumas tarefas de diferentes categorias
3. **Testar filtros:**
   - Por categoria (Tarefa, Teste, Trabalho, Estudo)
   - Por prioridade (Baixa, Média, Alta)
   - Por status (Todas, Pendentes, Concluídas)
4. **Verificar:** Filtros funcionam corretamente

### Tema Claro/Escuro
1. Vá para `/configuracoes` ou `/perfil`
2. Alterne entre tema claro e escuro
3. **Verificar:**
   - ✅ Mudança aplicada imediatamente
   - ✅ Cores adaptam corretamente
   - ✅ Tema persiste após refresh

## 🐛 Troubleshooting

### Problema: Página branca
- **Solução:** Abra o Console (F12) e verifique erros
- Verifique se todas as dependências foram instaladas: `npm install`
- Limpe cache do navegador (Cmd+Shift+R no Mac)

### Problema: Logs não aparecem
- **Solução:** Verifique se ActivityLogProvider está no App.tsx
- Limpe localStorage e recrie contas

### Problema: Email não envia
- **Solução:** Verifique se `globalSettings.emailNotifications` está `true`
- Verifique console para erros
- Emails são simulados, verifique localStorage

### Problema: Cores não aplicam
- **Solução:** Verifique se SettingsContext está no App.tsx
- Recarregue a página após alterar configurações

## ✅ Checklist de Testes Completos

- [ ] Registro de nova conta
- [ ] Envio de email ao registrar
- [ ] Login com diferentes roles
- [ ] Dashboard do estudante mostra dados
- [ ] Dashboard do admin mostra dados
- [ ] Criação de tarefas
- [ ] Edição de tarefas
- [ ] Eliminação de tarefas
- [ ] Marcar tarefa como concluída
- [ ] Filtros de tarefas funcionam
- [ ] Calendário mostra tarefas
- [ ] Edição de perfil
- [ ] Upload de foto (Base64)
- [ ] Alteração de senha
- [ ] Configurações pessoais (tema, fonte, cores)
- [ ] Admin: Criar usuário
- [ ] Admin: Editar usuário
- [ ] Admin: Eliminar usuário
- [ ] Admin: Visualizar logs
- [ ] Admin: Filtrar logs
- [ ] Admin: Exportar logs
- [ ] Admin: Configurações globais
- [ ] Logs são criados em todas as ações
- [ ] Responsividade funciona
- [ ] Tema claro/escuro funciona
- [ ] Navegação entre páginas funciona

## 🎯 Comandos Úteis

### Limpar dados de teste
```javascript
// No Console do navegador (F12)
localStorage.clear()
location.reload()
```

### Ver todos os dados armazenados
```javascript
// No Console
console.log({
  user: JSON.parse(localStorage.getItem('studyflow-user')),
  users: JSON.parse(localStorage.getItem('studyflow-users')),
  tasks: JSON.parse(localStorage.getItem('studyflow-tasks')),
  logs: JSON.parse(localStorage.getItem('studyflow-activity-logs')),
  emails: JSON.parse(localStorage.getItem('studyflow-sent-emails'))
})
```

### Criar tarefas de teste rapidamente
```javascript
// No Console (depois de fazer login)
const tasks = [
  { title: "Tarefa Urgente", category: "tarefa", priority: "alta", dueDate: new Date(Date.now() + 86400000).toISOString(), completed: false },
  { title: "Teste de Matemática", category: "teste", priority: "media", dueDate: new Date(Date.now() + 172800000).toISOString(), completed: false },
  { title: "Trabalho de História", category: "trabalho", priority: "baixa", dueDate: new Date(Date.now() + 259200000).toISOString(), completed: false }
];
const current = JSON.parse(localStorage.getItem('studyflow-tasks') || '[]');
tasks.forEach(t => {
  const task = { ...t, id: Date.now().toString() + Math.random(), createdAt: new Date().toISOString(), userId: JSON.parse(localStorage.getItem('studyflow-user')).id };
  current.push(task);
});
localStorage.setItem('studyflow-tasks', JSON.stringify(current));
location.reload();
```


