import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useTasks } from '../context/TaskContext';
import { Card } from '../components/Card';
import { TaskCategory, Priority } from '../types';
import { 
  Users, 
  CheckSquare, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  Trash2,
  UserCheck,
  FileText,
  Settings,
  UserPlus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { getAllTasks, getTasksByUser, deleteTask } = useTasks();
  const allTasks = getAllTasks();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Obter todos os usuários únicos
  const getAllUsers = () => {
    const users = JSON.parse(localStorage.getItem('studyflow-users') || '[]');
    const defaultUsers = [
      { id: '1', name: 'Admin', email: 'admin@studyflow.com' },
      { id: '2', name: 'Estudante Exemplo', email: 'estudante@studyflow.com' },
    ];
    return [...defaultUsers, ...users];
  };

  const users = getAllUsers();
  const selectedUserTasks = selectedUser ? getTasksByUser(selectedUser) : allTasks;

  // Estatísticas globais
  const totalUsers = users.length;
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;
  const overdueTasks = allTasks.filter(task => {
    if (task.completed) return false;
    return new Date(task.dueDate) < new Date();
  });

  // Estatísticas por categoria
  const getTasksByCategory = (category: TaskCategory) => {
    return selectedUserTasks.filter(task => task.category === category).length;
  };

  // Estatísticas por prioridade
  const getTasksByPriority = (priority: Priority) => {
    return selectedUserTasks.filter(task => task.priority === priority).length;
  };

  // Progresso por usuário
  const getUserStats = (userId: string) => {
    const userTasks = getTasksByUser(userId);
    const completed = userTasks.filter(t => t.completed).length;
    const total = userTasks.length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Dashboard Administrativo
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Visão geral de todos os usuários e atividades
            </p>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/usuarios">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <UserPlus size={24} className="text-[#4A90E2]" />
                </div>
                <div>
                  <p className="font-semibold text-[#333333] dark:text-white">Gestão de Usuários</p>
                  <p className="text-xs text-[#AAAAAA] dark:text-gray-400">Criar e gerenciar contas</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/admin/logs">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <FileText size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-[#333333] dark:text-white">Logs de Atividade</p>
                  <p className="text-xs text-[#AAAAAA] dark:text-gray-400">Visualizar todos os logs</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/admin/configuracoes">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Settings size={24} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-[#333333] dark:text-white">Configurações Globais</p>
                  <p className="text-xs text-[#AAAAAA] dark:text-gray-400">Ajustar padrões do sistema</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/tarefas">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckSquare size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-[#333333] dark:text-white">Gerenciar Tarefas</p>
                  <p className="text-xs text-[#AAAAAA] dark:text-gray-400">Ver todas as tarefas</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Estatísticas Globais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Total de Usuários</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">{totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users size={24} className="text-[#4A90E2]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Total de Tarefas</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">{totalTasks}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <CheckSquare size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Concluídas</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">{completedTasks}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Atrasadas</p>
                <p className="text-2xl font-bold text-[#D0021B]">{overdueTasks.length}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle size={24} className="text-[#D0021B]" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Estatísticas por Categoria */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Estatísticas por Categoria
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Tarefas</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">
                  {getTasksByCategory('tarefa')}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Testes</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">
                  {getTasksByCategory('teste')}
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Trabalhos</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">
                  {getTasksByCategory('trabalho')}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Estudos</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">
                  {getTasksByCategory('estudo')}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-[#333333] dark:text-white mb-3">
                Por Prioridade
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <span className="text-sm text-[#333333] dark:text-white">Alta</span>
                  <span className="font-bold text-[#D0021B]">{getTasksByPriority('alta')}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <span className="text-sm text-[#333333] dark:text-white">Média</span>
                  <span className="font-bold text-[#F5A623]">{getTasksByPriority('media')}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="text-sm text-[#333333] dark:text-white">Baixa</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {getTasksByPriority('baixa')}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Filtro por Usuário */}
          <Card>
            <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4">
              Filtrar por Usuário
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <button
                onClick={() => setSelectedUser(null)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  !selectedUser
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-50 dark:bg-gray-700 text-[#333333] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Todos os Usuários
              </button>
              {users.map((user) => {
                const stats = getUserStats(user.id);
                return (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedUser === user.id
                        ? 'bg-[#4A90E2] text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-[#333333] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{user.name}</p>
                      <span className="text-xs">
                        {stats.total} {stats.total === 1 ? 'tarefa' : 'tarefas'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-[#50E3C2] h-2 rounded-full transition-all"
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1">{Math.round(stats.percentage)}% concluído</p>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Lista de Tarefas */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">
              Tarefas {selectedUser ? `do Usuário Selecionado` : 'de Todos os Usuários'}
            </h2>
            <span className="text-sm text-[#AAAAAA] dark:text-gray-400">
              {selectedUserTasks.length} {selectedUserTasks.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          </div>
          {selectedUserTasks.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {selectedUserTasks.map((task) => {
                const taskUser = users.find(u => u.id === task.userId);
                const categoryColors: Record<TaskCategory, string> = {
                  tarefa: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
                  teste: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
                  trabalho: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
                  estudo: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
                };
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      task.completed
                        ? 'border-green-500 bg-gray-50 dark:bg-gray-700/50 opacity-60'
                        : 'border-[#4A90E2] bg-white dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-[#333333] dark:text-white">
                            {task.title}
                          </h3>
                          {task.completed && (
                            <UserCheck size={16} className="text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        {task.description && (
                          <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[task.category]}`}>
                            {task.category}
                          </span>
                          <span className="text-xs text-[#AAAAAA] dark:text-gray-400">
                            Prioridade: {task.priority}
                          </span>
                          <span className="text-xs text-[#AAAAAA] dark:text-gray-400">
                            {format(new Date(task.dueDate), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                          </span>
                          {taskUser && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-[#333333] dark:text-white">
                              {taskUser.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
                              deleteTask(task.id);
                            }
                          }}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-button transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} className="text-[#D0021B]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[#AAAAAA] dark:text-gray-400 text-center py-8">
              Nenhuma tarefa encontrada
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

