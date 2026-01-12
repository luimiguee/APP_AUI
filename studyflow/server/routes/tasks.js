// Rotas de Tarefas
const express = require('express');
const router = express.Router();
const { query } = require('../database/connection');
const { verifyToken } = require('./auth');

// Todas as rotas requerem autenticação
router.use(verifyToken);

// Listar tarefas do usuário
router.get('/', async (req, res) => {
  try {
    const tasks = await query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ tasks });
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Obter tarefa por ID
router.get('/:id', async (req, res) => {
  try {
    const tasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ task: tasks[0] });
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar tarefa
router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    const result = await query(
      'INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [
        req.user.id,
        title,
        description || null,
        status || 'pendente',
        priority || 'media',
        due_date || null
      ]
    );

    const tasks = await query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);

    // Adicionar log
    await query(
      'INSERT INTO activity_logs (user_id, user_email, action, details) VALUES (?, ?, ?, ?)',
      [req.user.id, req.user.email, 'Criação de Tarefa', `Tarefa criada: ${title}`]
    );

    res.status(201).json({ task: tasks[0] });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar tarefa
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    // Verificar se tarefa existe e pertence ao usuário
    const existingTasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ? AND user_id = ?',
      [
        title || existingTasks[0].title,
        description !== undefined ? description : existingTasks[0].description,
        status || existingTasks[0].status,
        priority || existingTasks[0].priority,
        due_date !== undefined ? due_date : existingTasks[0].due_date,
        req.params.id,
        req.user.id
      ]
    );

    const tasks = await query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);

    // Adicionar log
    await query(
      'INSERT INTO activity_logs (user_id, user_email, action, details) VALUES (?, ?, ?, ?)',
      [req.user.id, req.user.email, 'Atualização de Tarefa', `Tarefa atualizada: ${tasks[0].title}`]
    );

    res.json({ task: tasks[0] });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar tarefa
router.delete('/:id', async (req, res) => {
  try {
    // Verificar se tarefa existe e pertence ao usuário
    const existingTasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);

    // Adicionar log
    await query(
      'INSERT INTO activity_logs (user_id, user_email, action, details) VALUES (?, ?, ?, ?)',
      [req.user.id, req.user.email, 'Exclusão de Tarefa', `Tarefa deletada: ${existingTasks[0].title}`]
    );

    res.json({ success: true, message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;

