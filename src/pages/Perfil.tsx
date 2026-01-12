import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, Bell, Palette, Clock, Edit, Settings as SettingsIcon } from 'lucide-react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const Perfil: React.FC = () => {
  const { user } = useAuth();
  const { userSettings, updateUserSettings } = useSettings();

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
            Perfil e Configurações
          </h1>
          <p className="text-[#AAAAAA] dark:text-gray-400">
            Personalize sua experiência na plataforma
          </p>
        </div>

        {/* Informações do Usuário */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#4A90E2]"
                />
              ) : (
                <div className="w-16 h-16 bg-[#4A90E2] rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-white">{user?.name}</h2>
                <p className="text-[#AAAAAA] dark:text-gray-400">{user?.email}</p>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mt-1">
                  Membro desde {user?.createdAt ? format(new Date(user.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR }) : 'N/A'}
                </p>
              </div>
            </div>
            <Link to="/perfil/editar">
              <Button variant="outline">
                <Edit size={18} className="mr-2" />
                Editar Perfil
              </Button>
            </Link>
          </div>
        </Card>

        {/* Aparência */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Palette size={20} className="text-[#4A90E2]" />
              <h2 className="text-xl font-bold text-[#333333] dark:text-white">Aparência</h2>
            </div>
            <Link to="/configuracoes">
              <Button variant="outline" className="text-sm">
                <SettingsIcon size={16} className="mr-2" />
                Configurações Avançadas
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333] dark:text-white mb-1">Tema</p>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                  Escolha entre tema claro ou escuro
                </p>
              </div>
              <button
                onClick={() => updateUserSettings({ theme: userSettings.theme === 'dark' ? 'light' : 'dark' })}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-button font-medium text-[#333333] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {userSettings.theme === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
              </button>
            </div>
          </div>
        </Card>

        {/* Preferências */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Clock size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Preferências</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Categoria Padrão
              </label>
              <select
                value={userSettings.defaultCategory}
                onChange={(e) => updateUserSettings({ defaultCategory: e.target.value as any })}
                className="input"
              >
                <option value="tarefa">Tarefa</option>
                <option value="teste">Teste</option>
                <option value="trabalho">Trabalho</option>
                <option value="estudo">Estudo</option>
              </select>
              <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                Categoria padrão ao criar novas tarefas
              </p>
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
                  checked={userSettings.notifications}
                  onChange={(e) => updateUserSettings({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4A90E2]/20 dark:peer-focus:ring-[#4A90E2]/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#4A90E2]"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Sobre */}
        <Card>
          <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4">Sobre o StudyFlow</h2>
          <div className="space-y-2 text-[#AAAAAA] dark:text-gray-400">
            <p>Versão 2.0.0</p>
            <p>
              StudyFlow é uma plataforma de gestão de estudos desenvolvida para ajudá-lo a
              organizar tarefas, testes e trabalhos de forma eficiente.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

