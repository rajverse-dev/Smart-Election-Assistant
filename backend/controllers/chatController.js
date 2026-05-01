const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Save query to DB for dashboard to display
    if (message) {
      const chatEntry = new Chat({ query: message });
      await chatEntry.save();
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your backend .env file." 
      });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { customHeaders: { 'Referer': 'https://smart-election-assistant-837090440574.us-central1.run.app' } }
    );

    // Provide context for the VoteMate AI
    const systemInstruction = "You are VoteMate AI, an AI designed to help citizens of India with information about elections, voting processes, eligibility, and required documents. Provide concise, accurate, and helpful answers.";
    
    // Call Gemini API
    const result = await model.generateContent([
      { text: systemInstruction },
      { text: "User query: " + message }
    ]);
    
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
