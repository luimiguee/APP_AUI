import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar, User, Moon, Sun, LogOut, Shield, Settings, FileText, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Itens de navegação baseados no role
  const getNavItems = () => {
    if (isAdmin) {
      return [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/usuarios', icon: Users, label: 'Usuários' },
        { path: '/admin/logs', icon: FileText, label: 'Logs' },
        { path: '/admin/configuracoes', icon: Settings, label: 'Config' },
      ];
    }
    return [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/tarefas', icon: CheckSquare, label: 'Tarefas' },
      { path: '/calendario', icon: Calendar, label: 'Calendário' },
      { path: '/perfil', icon: User, label: 'Perfil' },
    ];
  };

  const navItems = getNavItems();

  if (!isAuthenticated) {
    return null; // Não mostra navbar para visitantes
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-[#333333] dark:text-white">StudyFlow</span>
              {isAdmin && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium flex items-center">
                  <Shield size={12} className="mr-1" />
                  Admin
                </span>
              )}
            </Link>
            <div className="hidden md:flex space-x-1">
              {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-button transition-all duration-200 ${
                      isActive
                        ? 'bg-[#4A90E2] text-white'
                        : 'text-[#AAAAAA] hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#333333] dark:hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {user && (
              <span className="hidden sm:block text-sm text-[#AAAAAA] dark:text-gray-400">
                {user.name}
              </span>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-button hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-button hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Sair"
            >
              <LogOut size={20} className="text-[#D0021B]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

