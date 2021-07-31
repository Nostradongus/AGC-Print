import request from 'supertest';
import app from '../app.js';

describe('Test Index Route', () => {
  it('should respond with 200 status code when requesting all users', async () => {
    const response = await request(app).get('/users/');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 404 status code when user not found', async () => {
    const response = await request(app).get('/users/:username');
    expect(response.statusCode).toBe(404);
  });

  it('should respond with 200 status code when user found', async () => {
    const response = await request(app).get('/users/RobinHomenick');
    expect(response.statusCode).toBe(200);
  });

});