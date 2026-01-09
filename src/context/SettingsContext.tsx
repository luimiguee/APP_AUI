import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserSettings, GlobalSettings } from '../types';
import { useAuth } from './AuthContext';

interface SettingsContextType {
  userSettings: UserSettings;
  globalSettings: GlobalSettings;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  updateGlobalSettings: (settings: Partial<GlobalSettings>) => void;
  applySettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'light',
  fontSize: 'medium',
  notifications: true,
  defaultCategory: 'tarefa',
  primaryColor: '#4A90E2',
  dashboardColors: {
    primary: '#4A90E2',
    secondary: '#50E3C2',
  },
};

const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  defaultTheme: 'light',
  defaultFontSize: 'medium',
  defaultPrimaryColor: '#4A90E2',
  defaultSecondaryColor: '#50E3C2',
  emailNotifications: true,
  registrationEnabled: true,
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    if (user) {
      const saved = localStorage.getItem(`studyflow-settings-${user.id}`);
      return saved ? { ...DEFAULT_USER_SETTINGS, ...JSON.parse(saved) } : DEFAULT_USER_SETTINGS;
    }
    return DEFAULT_USER_SETTINGS;
  });

  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem('studyflow-global-settings');
    return saved ? { ...DEFAULT_GLOBAL_SETTINGS, ...JSON.parse(saved) } : DEFAULT_GLOBAL_SETTINGS;
  });

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`studyflow-settings-${user.id}`);
      if (saved) {
        setUserSettings({ ...DEFAULT_USER_SETTINGS, ...JSON.parse(saved) });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`studyflow-settings-${user.id}`, JSON.stringify(userSettings));
    }
    applySettings();
  }, [userSettings, user]);

  useEffect(() => {
    localStorage.setItem('studyflow-global-settings', JSON.stringify(globalSettings));
  }, [globalSettings]);

  const updateUserSettings = (settings: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...settings }));
  };

  const updateGlobalSettings = (settings: Partial<GlobalSettings>) => {
    setGlobalSettings(prev => ({ ...prev, ...settings }));
  };

  const applySettings = React.useCallback(() => {
    // Aplicar tema
    if (userSettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Aplicar tamanho de fonte
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    document.documentElement.style.fontSize = fontSizeMap[userSettings.fontSize];

    // Aplicar cores personalizadas
    if (userSettings.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', userSettings.primaryColor);
    }
    if (userSettings.dashboardColors) {
      document.documentElement.style.setProperty('--secondary-color', userSettings.dashboardColors.secondary);
    }
  }, [userSettings]);

  // Aplicar configurações na inicialização e quando mudarem
  useEffect(() => {
    applySettings();
  }, [applySettings]);

  return (
    <SettingsContext.Provider value={{
      userSettings,
      globalSettings,
      updateUserSettings,
      updateGlobalSettings,
      applySettings,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

