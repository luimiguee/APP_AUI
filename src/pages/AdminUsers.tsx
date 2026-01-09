import React, { useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, UserRole } from '../types';
import { 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  Mail,
  Shield,
  UserCheck,
  User as UserIcon
} from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { getAllUsers, createUser, deleteUser, updateUser, user: currentUser } = useAuth();
  const users = getAllUsers();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'estudante' as UserRole,
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    const success = await createUser(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );

    if (success) {
      alert('Usuário criado com sucesso! Email de confirmação enviado.');
      setIsCreateModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'estudante' });
    } else {
      alert('Erro ao criar usuário. Email já pode estar em uso.');
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    const updates: Partial<User> = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    if (formData.password) {
      if (formData.password.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres');
        return;
      }
      (updates as any).password = formData.password;
    }

    const success = updateUser(editingUser.id, updates);
    
    if (success) {
      alert('Usuário atualizado com sucesso!');
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '', role: 'estudante' });
    } else {
      alert('Erro ao atualizar usuário.');
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (userId === currentUser?.id) {
      alert('Você não pode deletar seu próprio usuário');
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar o usuário "${userName}"? Esta ação não pode ser desfeita.`)) {
      const success = deleteUser(userId);
      if (success) {
        alert('Usuário deletado com sucesso!');
      } else {
        alert('Erro ao deletar usuário.');
      }
    }
  };

  const getRoleBadge = (role: UserRole) => {
    if (role === 'admin') {
      return (
        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium flex items-center">
          <Shield size={12} className="mr-1" />
          Admin
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium flex items-center">
        <UserCheck size={12} className="mr-1" />
        Estudante
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Gestão de Usuários
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Crie, edite e gerencie contas de usuários
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={18} className="mr-2" />
            Criar Usuário
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Total de Usuários</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">{users.length}</p>
              </div>
              <Users size={32} className="text-[#4A90E2]" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Administradores</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield size={32} className="text-purple-600 dark:text-purple-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">Estudantes</p>
                <p className="text-2xl font-bold text-[#333333] dark:text-white">
                  {users.filter(u => u.role === 'estudante').length}
                </p>
              </div>
              <UserCheck size={32} className="text-green-600 dark:text-green-400" />
            </div>
          </Card>
        </div>

        {/* Lista de Usuários */}
        <Card>
          <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4">
            Todos os Usuários
          </h2>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#4A90E2]"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#4A90E2] rounded-full flex items-center justify-center">
                        <UserIcon size={24} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-[#333333] dark:text-white">
                          {user.name}
                          {user.id === currentUser?.id && (
                            <span className="ml-2 text-xs text-[#AAAAAA] dark:text-gray-400">(Você)</span>
                          )}
                        </h3>
                        {getRoleBadge(user.role)}
                      </div>
                      <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">
                        {user.email}
                      </p>
                      <p className="text-xs text-[#AAAAAA] dark:text-gray-400">
                        Membro desde {format(new Date(user.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-button transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={18} className="text-[#4A90E2]" />
                    </button>
                    {user.id !== currentUser?.id && (
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-button transition-colors"
                        title="Deletar"
                      >
                        <Trash2 size={18} className="text-[#D0021B]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Modal de Criação */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#333333] dark:text-white">
                  Criar Novo Usuário
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Senha *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-[#AAAAAA] dark:text-gray-400 mt-1">
                    Mínimo de 6 caracteres
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Tipo de Usuário *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="input"
                    required
                  >
                    <option value="estudante">Estudante</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button type="submit" variant="primary" className="flex-1">
                    <Mail size={18} className="mr-2" />
                    Criar e Enviar Email
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Modal de Edição */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#333333] dark:text-white">
                  Editar Usuário
                </h2>
                <button
                  onClick={() => setEditingUser(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Nova Senha (deixe em branco para manter)
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input"
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Tipo de Usuário *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="input"
                    required
                  >
                    <option value="estudante">Estudante</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button variant="primary" onClick={handleUpdateUser} className="flex-1">
                    Salvar Alterações
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingUser(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

