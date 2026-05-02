const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testDirect() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say 'hello world'");
    console.log("Success! Response:", result.response.text());
  } catch (err) {
    console.error("Direct API Error:", err);
  }
}

testDirect();
