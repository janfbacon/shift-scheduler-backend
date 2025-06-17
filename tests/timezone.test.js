import request from 'supertest';
import app from '../src/index.js';

describe('Timezone API', () => {
  it('GET /api/timezone should return current timezone', async () => {
    const res = await request(app).get('/api/timezone');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('timezone');
  });

  it('PUT /api/timezone should update the timezone', async () => {
    const res = await request(app)
      .put('/api/timezone')
      .send({ timezone: 'America/New_York' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ timezone: 'America/New_York' });
  });
});