import { Router } from 'express';
import { getTodos, getTodo, createTodo, updateTodo, changeStatusTodo, deleteTodo } from '../controllers/todoController';

const router = Router();

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodo);
router.patch('/todos/:id', changeStatusTodo)
router.delete('/todos/:id', deleteTodo);

export default router;