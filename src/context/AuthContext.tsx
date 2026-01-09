import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { emailService } from '../services/emailService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, ipAddress?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userId: string, updates: Partial<User>) => boolean;
  deleteUser: (userId: string) => boolean;
  createUser: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  getAllUsers: () => User[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários padrão para demonstração
const DEFAULT_USERS = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@studyflow.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Estudante Exemplo',
    email: 'estudante@studyflow.com',
    password: 'estudante123',
    role: 'estudante' as UserRole,
    createdAt: new Date().toISOString(),
  },
];

const getSimulatedIP = (): string => {
  return `192.168.1.${Math.floor(Math.random() * 255)}`;
};

// Helper para adicionar log (acessa via window temporariamente)
const getAddActivityLog = () => {
  return (window as any).__addActivityLog as ((userId: string, userEmail: string, action: string, details: string, ipAddress?: string) => void) | null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('studyflow-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('studyflow-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('studyflow-user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const defaultUser = DEFAULT_USERS.find(u => u.email === email && u.password === password);
    if (defaultUser) {
      const { password: _, ...userWithoutPassword } = defaultUser;
      setUser(userWithoutPassword as User);
      
      const addLog = getAddActivityLog();
      if (addLog) {
        addLog(defaultUser.id, email, 'Login', 'Usuário fez login no sistema', getSimulatedIP());
      }
      return true;
    }

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      
      const addLog = getAddActivityLog();
      if (addLog) {
        addLog(foundUser.id, email, 'Login', 'Usuário fez login no sistema', getSimulatedIP());
      }
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, password: string, ipAddress?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const exists = savedUsers.some((u: any) => u.email === email) ||
                   DEFAULT_USERS.some(u => u.email === email);

    if (exists) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'estudante' as UserRole,
      createdAt: new Date().toISOString(),
    };

    savedUsers.push(newUser);
    localStorage.setItem('studyflow-users', JSON.stringify(savedUsers));

    const addLog = getAddActivityLog();
    if (addLog) {
      addLog(
        newUser.id,
        email,
        'Registro de conta',
        `Usuário ${name} registrou uma nova conta`,
        ipAddress || getSimulatedIP()
      );
    }

    // Email será enviado na página Register para melhor controle
    // O email já é enviado automaticamente, mas a página pode controlar melhor

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    return true;
  };

  const updateUser = (userId: string, updates: Partial<User>): boolean => {
    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const userIndex = savedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) {
      return false;
    }

    const oldUser = savedUsers[userIndex];
    savedUsers[userIndex] = { ...savedUsers[userIndex], ...updates };
    localStorage.setItem('studyflow-users', JSON.stringify(savedUsers));

    if (user?.id === userId) {
      const { password: _, ...userWithoutPassword } = savedUsers[userIndex];
      setUser(userWithoutPassword as User);
    }

    const addLog = getAddActivityLog();
    if (addLog && user) {
      addLog(
        user.id,
        user.email,
        'Atualização de perfil',
        `Perfil de ${oldUser.name} foi atualizado`,
        getSimulatedIP()
      );
    }

    return true;
  };

  const deleteUser = (userId: string): boolean => {
    if (userId === user?.id) {
      return false;
    }

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const userToDelete = savedUsers.find((u: any) => u.id === userId);
    const filteredUsers = savedUsers.filter((u: any) => u.id !== userId);
    localStorage.setItem('studyflow-users', JSON.stringify(filteredUsers));

    const tasks = JSON.parse(localStorage.getItem('studyflow-tasks') || '[]');
    const filteredTasks = tasks.filter((t: any) => t.userId !== userId);
    localStorage.setItem('studyflow-tasks', JSON.stringify(filteredTasks));

    const addLog = getAddActivityLog();
    if (addLog && user && userToDelete) {
      addLog(
        user.id,
        user.email,
        'Eliminação de conta',
        `Conta de ${userToDelete.name} (${userToDelete.email}) foi eliminada`,
        getSimulatedIP()
      );
    }

    return true;
  };

  const createUser = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const exists = savedUsers.some((u: any) => u.email === email) ||
                   DEFAULT_USERS.some(u => u.email === email);

    if (exists) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };

    savedUsers.push(newUser);
    localStorage.setItem('studyflow-users', JSON.stringify(savedUsers));

    const addLog = getAddActivityLog();
    if (addLog && user) {
      addLog(
        user.id,
        user.email,
        'Criação de conta',
        `Administrador criou conta para ${name} (${email}) como ${role}`,
        getSimulatedIP()
      );
    }

    await emailService.sendConfirmationEmail(email, name);

    return true;
  };

  const getAllUsers = (): User[] => {
    const savedUsers = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const defaultUsers = DEFAULT_USERS.map(u => {
      const { password: _, ...userWithoutPassword } = u;
      return userWithoutPassword as User;
    });
    const allUsers = [...defaultUsers, ...savedUsers.map((u: any) => {
      const { password: _, ...userWithoutPassword } = u;
      return userWithoutPassword as User;
    })];
    return allUsers;
  };

  const logout = () => {
    const addLog = getAddActivityLog();
    if (user && addLog) {
      addLog(user.id, user.email, 'Logout', 'Usuário fez logout do sistema', getSimulatedIP());
    }
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'estudante';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      deleteUser,
      createUser,
      getAllUsers,
      isAuthenticated,
      isAdmin,
      isStudent,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
