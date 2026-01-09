export type TaskCategory = 'tarefa' | 'teste' | 'trabalho' | 'estudo';
export type Priority = 'baixa' | 'media' | 'alta';
export type Theme = 'light' | 'dark';
export type UserRole = 'visitante' | 'estudante' | 'admin';
export type FontSize = 'small' | 'medium' | 'large';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  avatar?: string;
  password?: string; // Apenas para armazenamento local
}

export interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

export interface UserSettings {
  theme: Theme;
  fontSize: FontSize;
  notifications: boolean;
  defaultCategory: TaskCategory;
  primaryColor?: string;
  dashboardColors?: {
    primary: string;
    secondary: string;
  };
}

export interface GlobalSettings {
  defaultTheme: Theme;
  defaultFontSize: FontSize;
  defaultPrimaryColor: string;
  defaultSecondaryColor: string;
  emailNotifications: boolean;
  registrationEnabled: boolean;
}
