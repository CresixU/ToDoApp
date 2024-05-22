import { Schema, model, Document } from 'mongoose';

interface Todo extends Document {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<Todo>({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const TodoModel = model<Todo>('Todo', todoSchema);

export { Todo, TodoModel };