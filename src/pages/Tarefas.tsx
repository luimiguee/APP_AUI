import React, { useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useTasks } from '../context/TaskContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TaskModal } from '../components/TaskModal';
import { Task, TaskCategory, Priority } from '../types';
import { Plus, Edit2, Trash2, Filter, CheckCircle2, Circle } from 'lucide-react';

export const Tarefas: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | 'todos'>('todos');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'todos'>('todos');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendentes' | 'concluidas'>('todos');

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleSave = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    handleClose();
  };

  const filteredTasks = tasks.filter(task => {
    if (categoryFilter !== 'todos' && task.category !== categoryFilter) return false;
    if (priorityFilter !== 'todos' && task.priority !== priorityFilter) return false;
    if (statusFilter === 'pendentes' && task.completed) return false;
    if (statusFilter === 'concluidas' && !task.completed) return false;
    return true;
  });

  const getCategoryColor = (category: TaskCategory) => {
    const colors: Record<TaskCategory, string> = {
      tarefa: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      teste: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      trabalho: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      estudo: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    };
    return colors[category];
  };

  const getPriorityColor = (priority: Priority) => {
    const colors: Record<Priority, string> = {
      alta: 'text-red-600 dark:text-red-400',
      media: 'text-yellow-600 dark:text-yellow-400',
      baixa: 'text-green-600 dark:text-green-400',
    };
    return colors[priority];
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] dark:text-white mb-2">
              Tarefas
            </h1>
            <p className="text-[#AAAAAA] dark:text-gray-400">
              Gerencie todas as suas tarefas, testes e trabalhos
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Nova Tarefa</span>
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-[#AAAAAA] dark:text-gray-400" />
              <span className="text-sm font-medium text-[#333333] dark:text-white">Filtros:</span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as TaskCategory | 'todos')}
              className="input text-sm"
            >
              <option value="todos">Todas as Categorias</option>
              <option value="tarefa">Tarefas</option>
              <option value="teste">Testes</option>
              <option value="trabalho">Trabalhos</option>
              <option value="estudo">Estudos</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as Priority | 'todos')}
              className="input text-sm"
            >
              <option value="todos">Todas as Prioridades</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'todos' | 'pendentes' | 'concluidas')}
              className="input text-sm"
            >
              <option value="todos">Todas</option>
              <option value="pendentes">Pendentes</option>
              <option value="concluidas">Concluídas</option>
            </select>
          </div>
        </Card>

        {/* Lista de Tarefas */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => {
              const overdue = !task.completed && isOverdue(task.dueDate);
              return (
                <Card
                  key={task.id}
                  className={`transition-all duration-200 ${
                    task.completed ? 'opacity-60' : ''
                  } ${overdue ? 'border-l-4 border-[#D0021B]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-1 transition-transform hover:scale-110"
                      >
                        {task.completed ? (
                          <CheckCircle2 size={24} className="text-green-600 dark:text-green-400" />
                        ) : (
                          <Circle size={24} className="text-[#AAAAAA] dark:text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold mb-2 ${
                            task.completed
                              ? 'line-through text-[#AAAAAA] dark:text-gray-400'
                              : 'text-[#333333] dark:text-white'
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-[#AAAAAA] dark:text-gray-400 mb-3">
                            {task.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded text-xs font-medium ${getCategoryColor(
                              task.category
                            )}`}
                          >
                            {task.category}
                          </span>
                          <span
                            className={`text-xs font-medium ${getPriorityColor(task.priority)}`}
                          >
                            Prioridade: {task.priority}
                          </span>
                          <span
                            className={`text-xs ${
                              overdue
                                ? 'text-[#D0021B] font-semibold'
                                : 'text-[#AAAAAA] dark:text-gray-400'
                            }`}
                          >
                            {overdue ? '⚠️ Atrasado - ' : ''}
                            {format(new Date(task.dueDate), "dd 'de' MMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-button transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} className="text-[#AAAAAA] dark:text-gray-400" />
                      </button>
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
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <p className="text-[#AAAAAA] dark:text-gray-400 mb-4">
                Nenhuma tarefa encontrada com os filtros selecionados
              </p>
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                <Plus size={18} className="mr-2" />
                Criar Primeira Tarefa
              </Button>
            </div>
          </Card>
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSave}
          initialTask={editingTask}
        />
      </div>
    </div>
  );
};

