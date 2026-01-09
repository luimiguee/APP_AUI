import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useTasks } from '../context/TaskContext';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { TaskCategory } from '../types';
import { CheckSquare, FileText, BookOpen, Calendar as CalendarIcon, AlertTriangle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const { tasks, getTasksByCategory, getOverdueTasks } = useTasks();

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const overdueTasks = getOverdueTasks();

  // Notificações de prazos próximos (próximos 3 dias)
  const getUpcomingDeadlines = () => {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return tasks
      .filter(task => !task.completed)
      .filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= now && dueDate <= threeDaysFromNow;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  };

  const categoryStats = [
    { 
      category: 'tarefa' as TaskCategory, 
      label: 'Tarefas', 
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      icon: CheckSquare,
      count: getTasksByCategory('tarefa').length
    },
    { 
      category: 'teste' as TaskCategory, 
      label: 'Testes', 
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      icon: FileText,
      count: getTasksByCategory('teste').length
    },
    { 
      category: 'trabalho' as TaskCategory, 
      label: 'Trabalhos', 
      color: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      icon: BookOpen,
      count: getTasksByCategory('trabalho').length
    },
    { 
      category: 'estudo' as TaskCategory, 
      label: 'Estudos', 
      color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      icon: BookOpen,
      count: getTasksByCategory('estudo').length
    },
  ];

  const weekStart = startOfWeek(new Date(), { locale: ptBR });
  const weekEnd = endOfWeek(new Date(), { locale: ptBR });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  const getUpcomingTasks = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return tasks
      .filter(task => !task.completed)
      .filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= now && dueDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  };

  const upcomingDeadlines = getUpcomingDeadlines();

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-[#AAAAAA] dark:text-gray-400">
            Visão geral do seu progresso de estudos
          </p>
        </div>

        {/* Notificações de Prazos Próximos */}
        {upcomingDeadlines.length > 0 && (
          <Card className="border-l-4 border-[#F5A623]">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="text-[#F5A623]" size={20} />
              <h2 className="text-lg font-semibold text-[#333333] dark:text-white">
                Prazos Próximos (3 dias)
              </h2>
            </div>
            <div className="space-y-2">
              {upcomingDeadlines.map((task) => (
                <div key={task.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="font-medium text-[#333333] dark:text-white">{task.title}</p>
                  <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                    {format(new Date(task.dueDate), "dd 'de' MMM 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Cards de Estatísticas por Categoria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryStats.map(({ category, label, color, icon: Icon, count }) => (
            <Link key={category} to="/tarefas">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-1">{label}</p>
                    <p className="text-2xl font-bold text-[#333333] dark:text-white">{count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Barra de Progresso */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4">
              Progresso Geral
            </h2>
            <div className="space-y-4">
              <ProgressBar
                value={completedTasks}
                max={totalTasks || 1}
                label="Tarefas Concluídas"
                color="primary"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-2">Concluídas</p>
                  <p className="text-2xl font-bold text-[#4A90E2]">{completedTasks}</p>
                </div>
                <div>
                  <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-2">Total</p>
                  <p className="text-2xl font-bold text-[#333333] dark:text-white">{totalTasks}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Avisos */}
          <Card>
            <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-[#F5A623]" size={20} />
              Avisos
            </h2>
            {overdueTasks.length > 0 ? (
              <div className="space-y-2">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-[#D0021B]">
                    {overdueTasks.length} {overdueTasks.length === 1 ? 'tarefa atrasada' : 'tarefas atrasadas'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                Nenhuma tarefa atrasada! 🎉
              </p>
            )}
          </Card>
        </div>

        {/* Calendário Semanal */}
        <Card>
          <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4 flex items-center">
            <CalendarIcon className="mr-2" size={20} />
            Esta Semana
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayTasks = getTasksForDate(day);
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              
              return (
                <div
                  key={day.toString()}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isToday
                      ? 'border-[#4A90E2] bg-[#4A90E2]/10 dark:bg-[#4A90E2]/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${isToday ? 'text-[#4A90E2]' : 'text-[#AAAAAA] dark:text-gray-400'}`}>
                    {format(day, 'EEE', { locale: ptBR })}
                  </p>
                  <p className={`text-lg font-bold mb-2 ${isToday ? 'text-[#4A90E2]' : 'text-[#333333] dark:text-white'}`}>
                    {format(day, 'd')}
                  </p>
                  {dayTasks.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dayTasks.slice(0, 3).map((task) => {
                        const categoryColors: Record<TaskCategory, string> = {
                          tarefa: 'bg-blue-500',
                          teste: 'bg-purple-500',
                          trabalho: 'bg-orange-500',
                          estudo: 'bg-green-500',
                        };
                        return (
                          <div
                            key={task.id}
                            className={`w-2 h-2 rounded-full ${categoryColors[task.category]}`}
                            title={task.title}
                          />
                        );
                      })}
                      {dayTasks.length > 3 && (
                        <span className="text-xs text-[#AAAAAA] dark:text-gray-400">
                          +{dayTasks.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Próximas Tarefas */}
        <Card>
          <h2 className="text-xl font-bold text-[#333333] dark:text-white mb-4">
            Próximas Tarefas
          </h2>
          {getUpcomingTasks().length > 0 ? (
            <div className="space-y-3">
              {getUpcomingTasks().map((task) => {
                const categoryColors: Record<TaskCategory, string> = {
                  tarefa: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
                  teste: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
                  trabalho: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
                  estudo: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
                };
                const priorityColors: Record<string, string> = {
                  alta: 'border-l-red-500',
                  media: 'border-l-yellow-500',
                  baixa: 'border-l-green-500',
                };
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-l-4 ${priorityColors[task.priority]} bg-gray-50 dark:bg-gray-700/50`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#333333] dark:text-white mb-1">
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[task.category]}`}>
                            {task.category}
                          </span>
                          <span className="text-xs text-[#AAAAAA] dark:text-gray-400">
                            {format(new Date(task.dueDate), "dd 'de' MMM", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
              Nenhuma tarefa programada para esta semana
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};


