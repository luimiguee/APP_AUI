import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Palette, Type, Bell, Save } from 'lucide-react';
import { TaskCategory, FontSize } from '../types';

export const Settings: React.FC = () => {
  const { userSettings, updateUserSettings, applySettings } = useSettings();
  const [settings, setSettings] = useState(userSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUserSettings(settings);
    applySettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
            Configurações
          </h1>
          <p className="text-[#AAAAAA] dark:text-gray-400">
            Personalize sua experiência na plataforma
          </p>
        </div>

        {/* Aparência */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Palette size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Aparência</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Tema
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
                className="input"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Tamanho de Fonte
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) => setSettings({ ...settings, fontSize: e.target.value as FontSize })}
                className="input"
              >
                <option value="small">Pequeno (14px)</option>
                <option value="medium">Médio (16px)</option>
                <option value="large">Grande (18px)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Cor Primária do Dashboard
              </label>
              <input
                type="color"
                value={settings.primaryColor || '#4A90E2'}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  primaryColor: e.target.value,
                  dashboardColors: {
                    primary: e.target.value,
                    secondary: settings.dashboardColors?.secondary || '#50E3C2'
                  }
                })}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                {settings.primaryColor || '#4A90E2'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Cor Secundária do Dashboard
              </label>
              <input
                type="color"
                value={settings.dashboardColors?.secondary || '#50E3C2'}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  dashboardColors: {
                    primary: settings.primaryColor || '#4A90E2',
                    secondary: e.target.value
                  }
                })}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                {settings.dashboardColors?.secondary || '#50E3C2'}
              </p>
            </div>
          </div>
        </Card>

        {/* Preferências */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Type size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Preferências</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Categoria Padrão
              </label>
              <select
                value={settings.defaultCategory}
                onChange={(e) => setSettings({ ...settings, defaultCategory: e.target.value as TaskCategory })}
                className="input"
              >
                <option value="tarefa">Tarefa</option>
                <option value="teste">Teste</option>
                <option value="trabalho">Trabalho</option>
                <option value="estudo">Estudo</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Notificações */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Bell size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333] dark:text-white mb-1">
                  Receber Notificações
                </p>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                  Ative para receber lembretes de tarefas e prazos
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4A90E2]/20 dark:peer-focus:ring-[#4A90E2]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#4A90E2]"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Botões */}
        <div className="flex space-x-4">
          <Button variant="primary" onClick={handleSave} className="flex-1">
            <Save size={18} className="mr-2" />
            {saved ? '✓ Configurações Salvas!' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>
    </div>
  );
};


