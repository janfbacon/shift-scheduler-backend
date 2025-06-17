import request from 'supertest';
import app from '../src/index.js';

let workerId;

describe('Workers API', () => {
  it('POST /api/workers should create a worker', async () => {
    const res = await request(app).post('/api/workers').send({ name: 'John Doe' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('John Doe');
    workerId = res.body.id;
  });

  it('GET /api/workers should list workers', async () => {
    const res = await request(app).get('/api/workers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/workers/:id should update a worker', async () => {
    const res = await request(app).put(`/api/workers/${workerId}`).send({ name: 'Jane Doe' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Jane Doe');
  });

  it('DELETE /api/workers/:id should delete a worker', async () => {
    const res = await request(app).delete(`/api/workers/${workerId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Worker deleted.');
  });
});