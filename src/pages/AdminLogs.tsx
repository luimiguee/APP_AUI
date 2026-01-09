import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useActivityLog } from '../context/ActivityLogContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { 
  FileText, 
  Filter, 
  Search, 
  Download,
  Calendar,
  Clock,
  Trash2
} from 'lucide-react';
import { Button } from '../components/Button';

export const AdminLogs: React.FC = () => {
  const { getAllLogs, clearLogs } = useActivityLog();
  const { getAllUsers } = useAuth();
  const logs = getAllLogs();
  const users = getAllUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Filtros
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Filtro por busca
      if (searchTerm && !log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !log.action.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !log.details.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro por usuário
      if (selectedUser !== 'all' && log.userId !== selectedUser) {
        return false;
      }

      // Filtro por ação
      if (selectedAction !== 'all' && log.action !== selectedAction) {
        return false;
      }

      // Filtro por data
      if (dateFilter !== 'all') {
        const logDate = new Date(log.timestamp);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        switch (dateFilter) {
          case 'today':
            if (logDate < today) return false;
            break;
          case 'yesterday':
            if (logDate < yesterday || logDate >= today) return false;
            break;
          case 'week':
            if (logDate < lastWeek) return false;
            break;
          case 'month':
            if (logDate < lastMonth) return false;
            break;
        }
      }

      return true;
    });
  }, [logs, searchTerm, selectedUser, selectedAction, dateFilter]);

  // Estatísticas
  const stats = useMemo(() => {
    const actions = filteredLogs.reduce((acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: filteredLogs.length,
      actions,
    };
  }, [filteredLogs]);

  // Ações únicas para filtro
  const uniqueActions = useMemo(() => {
    return Array.from(new Set(logs.map(log => log.action)));
  }, [logs]);

  const handleExport = () => {
    const csv = [
      ['Data/Hora', 'Usuário', 'Email', 'Ação', 'Detalhes', 'IP'].join(','),
      ...filteredLogs.map(log => [
        format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
        users.find(u => u.id === log.userId)?.name || 'Desconhecido',
        log.userEmail,
        log.action,
        `"${log.details.replace(/"/g, '""')}"`,
        log.ipAddress || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      'Login': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      'Logout': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      'Registro de conta': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      'Criação de conta': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      'Atualização de perfil': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
      'Eliminação de conta': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      'Criação de tarefa': 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
      'Conclusão de tarefa': 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300',
    };
    return colors[action] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Logs de Atividade
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Visualize e filtre todas as atividades do sistema
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={handleExport}>
              <Download size={18} className="mr-2" />
              Exportar CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                if (window.confirm('Tem certeza que deseja limpar todos os logs?')) {
                  clearLogs();
                }
              }}
            >
              <Trash2 size={18} className="mr-2" />
              Limpar Logs
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Total de Logs</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText size={24} className="text-[#4A90E2]" />
              </div>
            </div>
          </Card>
          {Object.entries(stats.actions).slice(0, 3).map(([action, count]) => (
            <Card key={action}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">{action}</p>
                  <p className="text-2xl font-bold text-[#333333] dark:text-white">{count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filtros */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <Filter size={20} className="text-[#4A90E2]" />
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] dark:text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Usuário, ação, detalhes..."
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Usuário
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="input"
              >
                <option value="all">Todos os usuários</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Tipo de Ação
              </label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="input"
              >
                <option value="all">Todas as ações</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Período
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input"
              >
                <option value="all">Todo o período</option>
                <option value="today">Hoje</option>
                <option value="yesterday">Ontem</option>
                <option value="week">Últimos 7 dias</option>
                <option value="month">Últimos 30 dias</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Lista de Logs */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#333333] dark:text-white">
              Logs ({filteredLogs.length})
            </h2>
          </div>

          {filteredLogs.length > 0 ? (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredLogs.map((log) => {
                const logUser = users.find(u => u.id === log.userId);
                return (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                            {log.action}
                          </span>
                          <span className="text-sm text-[#AAAAAA] dark:text-gray-400">
                            {logUser?.name || 'Usuário Desconhecido'}
                          </span>
                          <span className="text-sm text-[#AAAAAA] dark:text-gray-400">
                            ({log.userEmail})
                          </span>
                        </div>
                        <p className="text-sm text-[#333333] dark:text-white mb-2">
                          {log.details}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-[#AAAAAA] dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>
                              {format(new Date(log.timestamp), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>
                              {format(new Date(log.timestamp), "HH:mm:ss", { locale: ptBR })}
                            </span>
                          </div>
                          {log.ipAddress && (
                            <div className="flex items-center space-x-1">
                              <span>IP: {log.ipAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-[#AAAAAA] dark:text-gray-400 mb-4" />
              <p className="text-[#AAAAAA] dark:text-gray-400">
                Nenhum log encontrado com os filtros selecionados
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

