const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Handles incoming chat messages from the user.
 * Interacts with the Gemini API to generate responses and stores history in MongoDB.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.handleChat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message || !sessionId) {
      return res.status(400).json({ error: "Message and sessionId are required" });
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your backend .env file." 
      });
    }

    // Fetch existing chat history from MongoDB
    let chatDoc = await Chat.findOne({ sessionId });
    if (!chatDoc) {
      chatDoc = new Chat({ sessionId, messages: [] });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel(
      { 
        model: "gemini-2.5-flash",
        systemInstruction: "You are VoteMate AI, an AI designed to help citizens of India with information about elections, voting processes, eligibility, and required documents. Provide concise, accurate, and helpful answers.",
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      },
      { customHeaders: { 'Referer': 'https://smart-election-assistant-837090440574.us-central1.run.app' } }
    );

    // Format history for Gemini API
    const history = chatDoc.messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Start chat session with history
    const chat = model.startChat({ history });

    // Send the new message
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    // Save user message and model response to MongoDB
    chatDoc.messages.push({ role: 'user', content: message });
    chatDoc.messages.push({ role: 'model', content: reply });
    chatDoc.lastUpdated = Date.now();
    await chatDoc.save();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    
    // Check if the error is a rate limit/quota error from Gemini API
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
      return res.status(429).json({ 
        error: "VoteMate AI is currently receiving too many requests. Please wait about 30 seconds and try again!" 
      });
    }

    res.status(500).json({ error: "Failed to process chat request" });
  }
};

/**
 * Retrieves the chat history for a specific session.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const chatDoc = await Chat.findOne({ sessionId });
    if (!chatDoc) {
      return res.status(200).json({ messages: [] });
    }
    res.status(200).json({ messages: chatDoc.messages });
  } catch (error) {
    console.error("Fetch history error:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
