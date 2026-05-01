const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.0-flash" },
      { customHeaders: { 'Referer': 'https://smart-election-assistant-837090440574.us-central1.run.app' } }
    );
    const systemInstruction = "You are VoteMate AI.";
    const message = "Hello";
    
    const result = await model.generateContent([
      { text: systemInstruction },
      { text: "User query: " + message }
    ]);
    
    console.log("Text:", result.response.text());
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
