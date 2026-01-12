// Serviço de API para comunicação com o backend
const API = {
  // URL base da API (ajuste conforme necessário)
  BASE_URL: window.API_URL || 'http://localhost:8000/api',

  // Obter token do localStorage
  getToken() {
    return localStorage.getItem('studyflow-token');
  },

  // Salvar token no localStorage
  setToken(token) {
    localStorage.setItem('studyflow-token', token);
  },

  // Remover token
  removeToken() {
    localStorage.removeItem('studyflow-token');
  },

  // Fazer requisição HTTP
  async request(endpoint, options = {}) {
    // Se endpoint começar com /admin.php, /auth.php ou /tasks.php, usar diretamente
    let url;
    if (endpoint.startsWith('/admin.php') || endpoint.startsWith('/auth.php') || endpoint.startsWith('/tasks.php')) {
      url = `${this.BASE_URL.replace('/api', '')}${endpoint}`;
    } else {
      url = `${this.BASE_URL}${endpoint}`;
    }
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  },

  // Autenticação
  async login(email, password) {
    const data = await this.request('/auth.php?action=login', {
      method: 'POST',
      body: { email, password }
    });

    if (data.token) {
      this.setToken(data.token);
      if (data.user) {
        localStorage.setItem('studyflow-user', JSON.stringify(data.user));
      }
    }

    return data;
  },

  async register(name, email, password) {
    const data = await this.request('/auth.php?action=register', {
      method: 'POST',
      body: { name, email, password }
    });

    if (data.token) {
      this.setToken(data.token);
      if (data.user) {
        localStorage.setItem('studyflow-user', JSON.stringify(data.user));
      }
    }

    return data;
  },

  async getCurrentUser() {
    try {
      const data = await this.request('/auth.php?action=me');
      if (data.user) {
        localStorage.setItem('studyflow-user', JSON.stringify(data.user));
      }
      return data.user;
    } catch (error) {
      this.removeToken();
      localStorage.removeItem('studyflow-user');
      return null;
    }
  },

  logout() {
    this.removeToken();
    localStorage.removeItem('studyflow-user');
    window.location.href = 'index.html';
  },

  // Tarefas
  async getTasks() {
    const data = await this.request('/tasks.php');
    return data.tasks || [];
  },

  async getTask(id) {
    const data = await this.request(`/tasks.php?id=${id}`);
    return data.task;
  },

  async createTask(task) {
    const data = await this.request('/tasks.php', {
      method: 'POST',
      body: task
    });
    return data.task;
  },

  async updateTask(id, task) {
    const data = await this.request(`/tasks.php?id=${id}`, {
      method: 'PUT',
      body: task
    });
    return data.task;
  },

  async deleteTask(id) {
    const data = await this.request(`/tasks.php?id=${id}`, {
      method: 'DELETE'
    });
    return data;
  },

  // Admin - Estatísticas
  async getAdminStats() {
    const data = await this.request('/admin.php?action=stats');
    return data.stats;
  },

  // Admin - Usuários
  async getUsers() {
    const data = await this.request('/admin.php?action=users');
    return data.users || [];
  },

  async getUser(id) {
    const data = await this.request(`/admin.php?action=user&id=${id}`);
    return data.user;
  },

  async createUser(userData) {
    const data = await this.request('/admin.php?action=create-user', {
      method: 'POST',
      body: userData
    });
    return data;
  },

  async updateUser(id, userData) {
    const data = await this.request(`/admin.php?action=update-user&id=${id}`, {
      method: 'PUT',
      body: userData
    });
    return data;
  },

  async deleteUser(id) {
    const data = await this.request(`/admin.php?action=delete-user&id=${id}`, {
      method: 'DELETE'
    });
    return data;
  },

  // Admin - Logs
  async getLogs(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const data = await this.request(`/admin.php?action=logs&${queryParams}`);
    return data;
  }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.API = API;
}

