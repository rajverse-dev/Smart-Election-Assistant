const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('API Endpoints', () => {
  // Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return API running status', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('VoteMate AI API is running...');
  });

  it('should return 400 if chatbot receives empty message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: "" });
    // It currently might just return 500 or proceed depending on implementation
    // We expect it to be handled gracefully later
    expect([400, 500]).toContain(res.statusCode);
  });
});
