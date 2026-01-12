import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Palette, Globe } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { globalSettings, updateGlobalSettings } = useSettings();
  const [settings, setSettings] = useState(globalSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateGlobalSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
            Configurações Globais
          </h1>
          <p className="text-[#AAAAAA] dark:text-gray-400">
            Configure padrões globais da plataforma
          </p>
        </div>

        {/* Tema Padrão */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Palette size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Aparência Padrão</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Tema Padrão
              </label>
              <select
                value={settings.defaultTheme}
                onChange={(e) => setSettings({ ...settings, defaultTheme: e.target.value as any })}
                className="input"
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Tamanho de Fonte Padrão
              </label>
              <select
                value={settings.defaultFontSize}
                onChange={(e) => setSettings({ ...settings, defaultFontSize: e.target.value as any })}
                className="input"
              >
                <option value="small">Pequeno</option>
                <option value="medium">Médio</option>
                <option value="large">Grande</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Cor Primária Padrão
              </label>
              <input
                type="color"
                value={settings.defaultPrimaryColor}
                onChange={(e) => setSettings({ ...settings, defaultPrimaryColor: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                {settings.defaultPrimaryColor}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Cor Secundária Padrão
              </label>
              <input
                type="color"
                value={settings.defaultSecondaryColor}
                onChange={(e) => setSettings({ ...settings, defaultSecondaryColor: e.target.value })}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                {settings.defaultSecondaryColor}
              </p>
            </div>
          </div>
        </Card>

        {/* Configurações do Sistema */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Globe size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Sistema</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333] dark:text-white mb-1">
                  Notificações por Email
                </p>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                  Enviar emails automaticamente para novos usuários
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4A90E2]/20 dark:peer-focus:ring-[#4A90E2]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#4A90E2]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333] dark:text-white mb-1">
                  Registro de Contas
                </p>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                  Permitir que novos usuários se registrem
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.registrationEnabled}
                  onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4A90E2]/20 dark:peer-focus:ring-[#4A90E2]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#4A90E2]"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Botões */}
        <div className="flex space-x-4">
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            {saved ? '✓ Salvo!' : 'Salvar Configurações Globais'}
          </Button>
        </div>
      </div>
    </div>
  );
};

