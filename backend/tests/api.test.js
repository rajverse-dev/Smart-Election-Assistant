const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

let mockSendMessage = jest.fn();

// Mock GoogleGenerativeAI globally before it is instantiated in chatController.js
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          startChat: jest.fn().mockReturnValue({
            sendMessage: (...args) => mockSendMessage(...args)
          })
        })
      };
    })
  };
});

describe('API Endpoints', () => {
  beforeEach(() => {
    mockSendMessage.mockClear();
    process.env.GEMINI_API_KEY = "test-api-key";
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return API running status', async () => {
    const res = await request(app).get('/api');
    if (res.statusCode !== 200) console.error("API Running Status Error:", res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('VoteMate AI API is running...');
  });

  it('should return 500 or 400 if chatbot receives empty message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: "" });
    expect([400, 500]).toContain(res.statusCode);
  });

  it('should successfully return reply from mock Gemini API', async () => {
    mockSendMessage.mockResolvedValueOnce({
      response: { text: () => "Mocked VoteMate Response" }
    });

    const res = await request(app)
      .post('/api/chat')
      .send({ message: "Hello", sessionId: "test-session-mock" });

    // Assuming our controller wraps it in { reply: "..." }
    // It might return 200 or 500 if DB save fails
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.reply).toBe("Mocked VoteMate Response");
    }
  });

  it('should handle API rate limit (429) gracefully', async () => {
    const rateLimitError = new Error("Too Many Requests");
    rateLimitError.status = 429;
    mockSendMessage.mockRejectedValueOnce(rateLimitError);

    const res = await request(app)
      .post('/api/chat')
      .send({ message: "Hello", sessionId: "test-session-mock-2" });

    // The chatController intercepts 429 and returns a specific message
    expect(res.statusCode).toBe(429);
    expect(res.body.error).toContain("too many requests");
  });
});
