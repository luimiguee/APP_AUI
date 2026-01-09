import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { 
  CheckSquare, 
  Calendar, 
  Bell, 
  TrendingUp, 
  BookOpen, 
  Target,
  ArrowRight,
  Users,
  BarChart3
} from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-[#333333] dark:text-white">StudyFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <button className="text-[#333333] dark:text-white hover:text-[#4A90E2] transition-colors font-medium">
                  Entrar
                </button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Registar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] dark:text-white mb-6">
            Organize seus estudos de forma
            <span className="text-[#4A90E2]"> inteligente</span>
          </h1>
          <p className="text-xl text-[#AAAAAA] dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A plataforma completa para gerenciar tarefas, trabalhos, testes e muito mais.
            Simplifique sua vida acadêmica com ferramentas poderosas e intuitivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="primary" className="flex items-center space-x-2">
                <span>Começar Agora</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Já tenho conta</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-[#333333] dark:text-white mb-12">
          Funcionalidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <CheckSquare size={24} className="text-[#4A90E2]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                  Gestão de Tarefas
                </h3>
                <p className="text-[#AAAAAA] dark:text-gray-400">
                  Organize tarefas, trabalhos e testes em um só lugar. Crie, edite e acompanhe seu progresso facilmente.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                  Calendário Inteligente
                </h3>
                <p className="text-[#AAAAAA] dark:text-gray-400">
                  Visualize suas atividades em calendário semanal ou mensal. Nunca perca um prazo importante.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Bell size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                  Notificações
                </h3>
                <p className="text-[#AAAAAA] dark:text-gray-400">
                  Receba lembretes discretos sobre prazos próximos e tarefas pendentes.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                  Acompanhe Progresso
                </h3>
                <p className="text-[#AAAAAA] dark:text-gray-400">
                  Visualize seu progresso com barras e gráficos. Veja quantas tarefas já concluiu.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                <Target size={24} className="text-[#50E3C2]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                  Organização por Categorias
                </h3>
                <p className="text-[#AAAAAA] dark:text-gray-400">
                  Classifique tarefas por tipo: tarefas, testes, trabalhos e estudos.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                  Priorização
                </h3>
                <p className="text-[#AAAAAA] dark:text-gray-400">
                  Marque tarefas por prioridade: baixa, média ou alta. Foque no que é importante.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#333333] dark:text-white mb-12">
            Por que escolher o StudyFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4A90E2]/10 dark:bg-[#4A90E2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-[#4A90E2]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                Fácil de Usar
              </h3>
              <p className="text-[#AAAAAA] dark:text-gray-400">
                Interface intuitiva e minimalista. Sem complicações, você foca nos seus estudos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#50E3C2]/10 dark:bg-[#50E3C2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={32} className="text-[#50E3C2]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                Acompanhe seu Progresso
              </h3>
              <p className="text-[#AAAAAA] dark:text-gray-400">
                Visualize estatísticas e gráficos do seu desempenho acadêmico.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F5A623]/10 dark:bg-[#F5A623]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-[#F5A623]" />
              </div>
              <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-2">
                Personalizável
              </h3>
              <p className="text-[#AAAAAA] dark:text-gray-400">
                Configure tema, notificações e preferências conforme sua necessidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#333333] dark:text-white mb-4">
          Pronto para organizar seus estudos?
        </h2>
        <p className="text-xl text-[#AAAAAA] dark:text-gray-400 mb-8">
          Comece gratuitamente hoje mesmo
        </p>
        <Link to="/register">
          <Button variant="primary" className="text-lg px-8 py-4">
            Criar Conta Grátis
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-2">StudyFlow</h3>
              <p className="text-sm text-gray-400">
                Plataforma de gestão de estudos
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recursos</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Gestão de Tarefas</li>
                <li>Calendário</li>
                <li>Notificações</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Suporte</h3>
              <p className="text-sm text-gray-400">
                Sistema de demonstração
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 StudyFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

