import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useTasks } from '../context/TaskContext';
import { Card } from '../components/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TaskCategory } from '../types';

export const Calendario: React.FC = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get first day of month (to pad calendar)
  const firstDayOfMonth = monthStart.getDay();
  const paddedDays = Array(firstDayOfMonth).fill(null);

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  const getCategoryColor = (category: TaskCategory) => {
    const colors: Record<TaskCategory, string> = {
      tarefa: 'bg-blue-500',
      teste: 'bg-purple-500',
      trabalho: 'bg-orange-500',
      estudo: 'bg-green-500',
    };
    return colors[category];
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Calendário
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Visualize todas as suas atividades
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-button font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-white dark:bg-gray-800 text-[#333333] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-button font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-[#4A90E2] text-white'
                  : 'bg-white dark:bg-gray-800 text-[#333333] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Semana
            </button>
          </div>
        </div>

        <Card>
          {/* Controles do Calendário */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold text-[#333333] dark:text-white">
              {format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {viewMode === 'month' ? (
            <div>
              {/* Cabeçalho dos Dias da Semana */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-[#AAAAAA] dark:text-gray-400 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Dias do Calendário */}
              <div className="grid grid-cols-7 gap-2">
                {paddedDays.map((_, index) => (
                  <div key={`pad-${index}`} className="aspect-square" />
                ))}
                {monthDays.map((day) => {
                  const dayTasks = getTasksForDate(day);
                  const isToday = isSameDay(day, new Date());
                  const isCurrentMonth = isSameMonth(day, currentDate);

                  return (
                    <div
                      key={day.toString()}
                      className={`aspect-square p-2 rounded-lg border-2 transition-all ${
                        isToday
                          ? 'border-[#4A90E2] bg-[#4A90E2]/10 dark:bg-[#4A90E2]/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      } ${!isCurrentMonth ? 'opacity-40' : ''}`}
                    >
                      <div
                        className={`text-sm font-semibold mb-1 ${
                          isToday
                            ? 'text-[#4A90E2]'
                            : 'text-[#333333] dark:text-white'
                        }`}
                      >
                        {format(day, 'd')}
                      </div>
                      <div className="space-y-1">
                        {dayTasks.slice(0, 3).map((task) => (
                          <div
                            key={task.id}
                            className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                              task.category
                            )} text-white truncate`}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {dayTasks.length > 3 && (
                          <div className="text-xs text-[#AAAAAA] dark:text-gray-400">
                            +{dayTasks.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* Visualização Semanal */}
              <div className="space-y-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(currentDate);
                  date.setDate(monthStart.getDate() + i - firstDayOfMonth);
                  const dayTasks = getTasksForDate(date);
                  const isToday = isSameDay(date, new Date());

                  return (
                    <div
                      key={date.toString()}
                      className={`p-4 rounded-lg border-2 ${
                        isToday
                          ? 'border-[#4A90E2] bg-[#4A90E2]/10 dark:bg-[#4A90E2]/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-sm text-[#AAAAAA] dark:text-gray-400">
                            {format(date, 'EEEE', { locale: ptBR })}
                          </span>
                          <span
                            className={`ml-2 font-semibold ${
                              isToday
                                ? 'text-[#4A90E2]'
                                : 'text-[#333333] dark:text-white'
                            }`}
                          >
                            {format(date, 'd')}
                          </span>
                        </div>
                        <span className="text-xs text-[#AAAAAA] dark:text-gray-400">
                          {dayTasks.length} {dayTasks.length === 1 ? 'evento' : 'eventos'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-2 rounded ${getCategoryColor(
                              task.category
                            )} text-white text-sm`}
                          >
                            <div className="font-medium">{task.title}</div>
                            <div className="text-xs opacity-90 mt-1">
                              {format(new Date(task.dueDate), 'HH:mm')}
                            </div>
                          </div>
                        ))}
                        {dayTasks.length === 0 && (
                          <p className="text-sm text-[#AAAAAA] dark:text-gray-400">
                            Nenhum evento neste dia
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Legenda */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white mb-3">
              Legenda:
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-blue-500" />
                <span className="text-sm text-[#AAAAAA] dark:text-gray-400">Tarefas</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-purple-500" />
                <span className="text-sm text-[#AAAAAA] dark:text-gray-400">Testes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-orange-500" />
                <span className="text-sm text-[#AAAAAA] dark:text-gray-400">Trabalhos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-green-500" />
                <span className="text-sm text-[#AAAAAA] dark:text-gray-400">Estudos</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

