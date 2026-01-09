import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskCategory, Priority } from '../types';

const getSimulatedIP = (): string => {
  return `192.168.1.${Math.floor(Math.random() * 255)}`;
};

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getTasksByCategory: (category: TaskCategory) => Task[];
  getTasksByPriority: (priority: Priority) => Task[];
  getOverdueTasks: () => Task[];
  getAllTasks: () => Task[]; // Para admin
  getTasksByUser: (userId: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('studyflow-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('studyflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    // Obtém o usuário atual do localStorage
    const currentUser = JSON.parse(localStorage.getItem('studyflow-user') || 'null');
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: currentUser?.id || 'anonymous',
    };
    setTasks(prev => [...prev, newTask]);

    // Adiciona log
    const addLog = (window as any).__addActivityLog;
    if (addLog && currentUser) {
      addLog(
        currentUser.id,
        currentUser.email,
        'Criação de tarefa',
        `Tarefa "${task.title}" criada`,
        getSimulatedIP()
      );
    }
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const currentUser = JSON.parse(localStorage.getItem('studyflow-user') || 'null');
    const task = tasks.find(t => t.id === id);
    
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, ...updates } : t
    ));

    // Adiciona log
    const addLog = (window as any).__addActivityLog;
    if (addLog && currentUser && task) {
      if (updates.completed !== undefined) {
        addLog(
          currentUser.id,
          currentUser.email,
          updates.completed ? 'Conclusão de tarefa' : 'Reabertura de tarefa',
          `Tarefa "${task.title}" ${updates.completed ? 'concluída' : 'reaberta'}`,
          getSimulatedIP()
        );
      } else {
        addLog(
          currentUser.id,
          currentUser.email,
          'Atualização de tarefa',
          `Tarefa "${task.title}" atualizada`,
          getSimulatedIP()
        );
      }
    }
  };

  const deleteTask = (id: string) => {
    const currentUser = JSON.parse(localStorage.getItem('studyflow-user') || 'null');
    const task = tasks.find(t => t.id === id);
    
    setTasks(prev => prev.filter(t => t.id !== id));

    // Adiciona log
    const addLog = (window as any).__addActivityLog;
    if (addLog && currentUser && task) {
      addLog(
        currentUser.id,
        currentUser.email,
        'Eliminação de tarefa',
        `Tarefa "${task.title}" eliminada`,
        getSimulatedIP()
      );
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter(task => task.category === category);
  };

  const getTasksByPriority = (priority: Priority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getOverdueTasks = () => {
    const now = new Date();
    const currentUser = JSON.parse(localStorage.getItem('studyflow-user') || 'null');
    const userTasks = currentUser?.role === 'admin' 
      ? tasks 
      : tasks.filter(t => t.userId === currentUser?.id);
    
    return userTasks.filter(task => {
      if (task.completed) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate < now;
    });
  };

  const getAllTasks = () => {
    return tasks; // Para admin ver todas as tarefas
  };

  const getTasksByUser = (userId: string) => {
    return tasks.filter(task => task.userId === userId);
  };

  // Filtrar tarefas por usuário (exceto para admin)
  const currentUser = JSON.parse(localStorage.getItem('studyflow-user') || 'null');
  const filteredTasks = currentUser?.role === 'admin' 
    ? tasks 
    : tasks.filter(task => task.userId === currentUser?.id);

  return (
    <TaskContext.Provider value={{
      tasks: filteredTasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      getTasksByCategory,
      getTasksByPriority,
      getOverdueTasks,
      getAllTasks,
      getTasksByUser,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
