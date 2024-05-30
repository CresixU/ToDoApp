import request from 'supertest';
import app from '../../src/app'; //'../../src/app'; // Twój plik z konfiguracją aplikacji Express
import { TodoModel } from '../../src/models/todo'; // Twój model MongoDB
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = 'test';
const dbURI = process.env.MONGO_URI_TESTS?.toString();
const defaultEndpointUrl = '/api/todos';

beforeAll(async () => {
  if(!dbURI)
    throw new Error("No connection string in .env.test file");
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
});

beforeEach(async () => {
  await TodoModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todos API', () => {
  let todoId:string;

  beforeEach(async () => {
    const todo = await TodoModel.create({ name: 'Test Todo', description: 'Test description'});
    todoId = todo._id;
  });

  test('GET /todos - powinno zwrócić listę zadań', async () => {
    const response = await request(app).get(defaultEndpointUrl);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('GET /todos/:id - powinno zwrócić zadanie o podanym id', async () => {
    const response = await request(app).get(`${defaultEndpointUrl}/${todoId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(todoId.toString());
  });

  test('POST /todos - powinno utworzyć nowe zadanie', async () => {
    const newTodo = { name: 'New Todo', description: 'New description', date: new Date(), status: 'pending' };
    const response = await request(app).post(defaultEndpointUrl).send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newTodo.name);
  });

  test('PUT /todos/:id - powinno zaktualizować istniejące zadanie', async () => {
    const updatedTodo = { name: 'Updated Todo', description: 'Updated description', date: new Date(), status: 'done' };
    const response = await request(app).put(`${defaultEndpointUrl}/${todoId}`).send(updatedTodo);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedTodo.name);
  });

  test('DELETE /todos/:id - powinno usunąć zadanie', async () => {
    const response = await request(app).delete(`${defaultEndpointUrl}/${todoId}`);
    expect(response.status).toBe(204);
  });
});