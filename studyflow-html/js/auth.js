// Sistema de Autenticação
const Auth = {
  // Usuários padrão
  DEFAULT_USERS: [
    {
      id: '1',
      name: 'Admin',
      email: 'admin@studyflow.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Estudante Exemplo',
      email: 'estudante@studyflow.com',
      password: 'estudante123',
      role: 'estudante',
      createdAt: new Date().toISOString(),
    },
  ],

  // Inicializar usuários padrão
  init() {
    const users = this.getUsers();
    if (users.length === 0) {
      localStorage.setItem('studyflow-users', JSON.stringify(this.DEFAULT_USERS));
    }
  },

  // Obter usuário atual
  getCurrentUser() {
    const userStr = localStorage.getItem('studyflow-user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Obter todos os usuários
  getUsers() {
    const defaultUsers = this.DEFAULT_USERS;
    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    return [...defaultUsers, ...savedUsers];
  },

  // Fazer login
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay

    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('studyflow-user', JSON.stringify(userWithoutPassword));
      
      // Adicionar log de atividade
      ActivityLog.add(user.id, user.email, 'Login', 'Usuário fez login no sistema');
      
      return true;
    }
    
    return false;
  },

  // Registrar novo usuário
  async register(name, email, password) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getUsers();
    
    // Verificar se email já existe
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Este email já está cadastrado' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'estudante',
      createdAt: new Date().toISOString(),
    };

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    savedUsers.push(newUser);
    localStorage.setItem('studyflow-users', JSON.stringify(savedUsers));

    // Fazer login automático
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('studyflow-user', JSON.stringify(userWithoutPassword));

    // Adicionar log de atividade
    ActivityLog.add(newUser.id, email, 'Registro', 'Novo usuário registrado');
    
    // Simular envio de email
    EmailService.sendWelcomeEmail(email, name);

    return { success: true };
  },

  // Fazer logout
  logout() {
    localStorage.removeItem('studyflow-user');
    window.location.href = 'index.html';
  },

  // Verificar autenticação
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  // Verificar se é admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  },

  // Verificar se é estudante
  isStudent() {
    const user = this.getCurrentUser();
    return user && user.role === 'estudante';
  },

  // Atualizar usuário
  updateUser(userId, updates) {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return false;

    users[userIndex] = { ...users[userIndex], ...updates };
    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const defaultUserIds = this.DEFAULT_USERS.map(u => u.id);
    
    if (defaultUserIds.includes(userId)) {
      // Atualizar usuário padrão (não salvar, apenas atualizar em memória)
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem('studyflow-user', JSON.stringify(updatedUser));
      }
    } else {
      const savedIndex = savedUsers.findIndex(u => u.id === userId);
      if (savedIndex !== -1) {
        savedUsers[savedIndex] = { ...savedUsers[savedIndex], ...updates };
        localStorage.setItem('studyflow-users', JSON.stringify(savedUsers));
        
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
          const { password, ...userWithoutPassword } = savedUsers[savedIndex];
          localStorage.setItem('studyflow-user', JSON.stringify(userWithoutPassword));
        }
      }
    }

    return true;
  },

  // Criar usuário (admin)
  createUser(name, email, password, role) {
    const users = this.getUsers();
    
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Este email já está cadastrado' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: role || 'estudante',
      createdAt: new Date().toISOString(),
    };

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    savedUsers.push(newUser);
    localStorage.setItem('studyflow-users', JSON.stringify(savedUsers));

    ActivityLog.add(newUser.id, email, 'Criação de Usuário', `Usuário criado por ${this.getCurrentUser().name}`);
    EmailService.sendWelcomeEmail(email, name);

    return { success: true, user: newUser };
  },

  // Deletar usuário
  deleteUser(userId) {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      return false; // Não pode deletar a si mesmo
    }

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const filtered = savedUsers.filter(u => u.id !== userId);
    localStorage.setItem('studyflow-users', JSON.stringify(filtered));
    
    return true;
  }
};

// Inicializar ao carregar
Auth.init();

