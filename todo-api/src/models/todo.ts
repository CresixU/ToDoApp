import { Schema, model, Document } from 'mongoose';

interface Todo extends Document {
	name: string
	description: string
	date: string
	status: "pending" | "done"
}

const todoSchema = new Schema<Todo>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: String,
    default: () => new Date().toISOString()
  },
  status: {
    type: String,
    default: "pending"
  }
});

const TodoModel = model<Todo>('Todo', todoSchema);

export { Todo, TodoModel };