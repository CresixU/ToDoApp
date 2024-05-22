import { Request, Response} from 'express'
import { Todo } from '../models/todo';

let todos: Todo[] = [];
let idCounter = 1;

export const getTodos = (req: Request, res: Response) => {
    res.json(todos);
};

export const getTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id == id)
    if(todo)
        res.json(todo);
    else
        res.status(404).send("Todo not found");
};

export const createTodo = (req: Request, res: Response) => {
    const newTodo: Todo = {
        id: idCounter++,
        title: req.body.title,
        completed: req.body.completed || false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
};

export const updateTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      todos[index] = { ...todos[index], ...req.body };
      res.json(todos[index]);
    } 
    else 
      res.status(404).send('Todo not found');
  };
  
  export const deleteTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
  };