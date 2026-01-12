import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, Upload, Save, X } from 'lucide-react';

export const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Converte para base64 (em produção, faria upload para servidor)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) return;

      // Validações
      if (newPassword && newPassword !== confirmPassword) {
        setError('As senhas não coincidem');
        setLoading(false);
        return;
      }

      if (newPassword && newPassword.length < 6) {
        setError('A nova senha deve ter no mínimo 6 caracteres');
        setLoading(false);
        return;
      }

      // Atualiza usuário
      const updates: any = {
        name,
        email,
        avatar,
      };

      // Atualiza senha se fornecida
      if (newPassword) {
        // Em produção, verificaria a senha atual antes
        updates.password = newPassword;
      }

      const success = updateUser(user.id, updates);
      
      if (success) {
        alert('Perfil atualizado com sucesso!');
        navigate('/perfil');
      } else {
        setError('Erro ao atualizar perfil');
      }
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Editar Perfil
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Atualize suas informações pessoais
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/perfil')}>
            <X size={18} className="mr-2" />
            Cancelar
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Foto de Perfil */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Foto de Perfil
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#4A90E2]"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-[#4A90E2] rounded-full flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-[#4A90E2] text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Upload size={16} />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">
                    JPG, PNG ou GIF. Máximo 5MB.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Nome */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            {/* Mudança de Senha */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-[#333333] dark:text-white mb-4">
                Alterar Senha
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input"
                    placeholder="Deixe em branco para manter a senha atual"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input"
                    placeholder="Mínimo de 6 caracteres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button type="submit" variant="primary" disabled={loading}>
                <Save size={18} className="mr-2" />
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/perfil')}>
                Cancelar
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};


