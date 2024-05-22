import { Request, Response } from 'express';
import { TodoModel } from '../models/todo';

const errorCode500 = "Internal Server Error";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: errorCode500 });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).json({ error: errorCode500 });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = new TodoModel({
      title: req.body.title,
      completed: req.body.completed
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: errorCode500 });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).json({ error: errorCode500 });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
      res.status(204).send();
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).json({ error: errorCode500 });
  }
};