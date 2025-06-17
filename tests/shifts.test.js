import request from 'supertest';
import app from '../src/index.js';

let workerId, shiftId;

beforeAll(async () => {
  // Set a known timezone
  await request(app).put('/api/timezone').send({ timezone: 'UTC' });

  // Create a worker
  const workerRes = await request(app).post('/api/workers').send({ name: 'Shift Worker' });
  workerId = workerRes.body.id;
});

describe('Shifts API', () => {
  it('POST /api/shifts should create a valid shift', async () => {
    const res = await request(app).post('/api/shifts').send({
      workerId,
      start: '2025-06-01T08:00:00Z',
      end: '2025-06-01T12:00:00Z'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.duration).toBeCloseTo(4.0);
    shiftId = res.body.id;
  });

  it('GET /api/shifts should return shifts', async () => {
    const res = await request(app).get('/api/shifts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/shifts/:id should update a shift', async () => {
    const res = await request(app).put(`/api/shifts/${shiftId}`).send({
      workerId,
      start: '2025-06-01T09:00:00Z',
      end: '2025-06-01T13:00:00Z'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.duration).toBeCloseTo(4.0);
  });

  it('DELETE /api/shifts/:id should delete a shift', async () => {
    const res = await request(app).delete(`/api/shifts/${shiftId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Shift deleted.');
  });
});