import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { BookOpen, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Verifica o role do usuário para redirecionar corretamente
        const userStr = localStorage.getItem('studyflow-user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-lg flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-[#333333] dark:text-white">StudyFlow</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-[#AAAAAA] dark:text-gray-400">
            Entre na sua conta para continuar
          </p>
        </div>

        <Card>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
              <AlertCircle size={18} className="text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-[#4A90E2] hover:underline font-medium">
                Registrar-se
              </Link>
            </p>
          </div>

          {/* Credenciais de demonstração */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs font-semibold text-[#333333] dark:text-white mb-2">
              Contas de demonstração:
            </p>
            <div className="space-y-1 text-xs text-[#AAAAAA] dark:text-gray-400">
              <p><strong>Admin:</strong> admin@studyflow.com / admin123</p>
              <p><strong>Estudante:</strong> estudante@studyflow.com / estudante123</p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-[#AAAAAA] dark:text-gray-400 hover:text-[#4A90E2] transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

