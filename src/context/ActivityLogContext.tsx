import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ActivityLog } from '../types';

interface ActivityLogContextType {
  logs: ActivityLog[];
  addLog: (userId: string, userEmail: string, action: string, details: string, ipAddress?: string) => void;
  getLogsByUser: (userId: string) => ActivityLog[];
  getAllLogs: () => ActivityLog[];
  clearLogs: () => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined);

// Função para obter IP simulado (em produção, viria de uma API ou servidor)
const getSimulatedIP = (): string => {
  return `192.168.1.${Math.floor(Math.random() * 255)}`;
};

export const ActivityLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('studyflow-activity-logs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('studyflow-activity-logs', JSON.stringify(logs));
  }, [logs]);

  const addLog = React.useCallback((
    userId: string,
    userEmail: string,
    action: string,
    details: string,
    ipAddress?: string
  ) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      userId,
      userEmail,
      action,
      details,
      ipAddress: ipAddress || getSimulatedIP(),
      timestamp: new Date().toISOString(),
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);

  // Expõe addLog globalmente para uso no AuthContext (abordagem temporária)
  useEffect(() => {
    (window as any).__addActivityLog = addLog;
    return () => {
      delete (window as any).__addActivityLog;
    };
  }, [addLog]);

  const getLogsByUser = (userId: string) => {
    return logs.filter(log => log.userId === userId);
  };

  const getAllLogs = () => {
    return logs;
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <ActivityLogContext.Provider value={{
      logs,
      addLog,
      getLogsByUser,
      getAllLogs,
      clearLogs,
    }}>
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLog must be used within ActivityLogProvider');
  }
  return context;
};

