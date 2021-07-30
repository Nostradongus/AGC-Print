import request from 'supertest';
import app from '../app.js';

describe('Test Index Route', () => {
  it('should respond with 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with 201 status code if successful registration and should have a body property of username', async () => {
    const response = await request(app).post('/register').send({
      username: 'Sonson_Great',
      pw: 'Hakdoq1234',
      firstname: 'Sonson',
      lastname: 'Great',
      contactNo: '123456789',
      email: 'sonson_great@sample.com',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('username');
  });
});
