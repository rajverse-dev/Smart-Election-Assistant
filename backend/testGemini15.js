const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({path: '../../env.yaml'}); // Just grab the key directly or I'll inject it.
const fs = require('fs');
const yaml = require('js-yaml');

const envFile = fs.readFileSync('../../env.yaml', 'utf8');
const envConfig = yaml.load(envFile);

const genAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { customHeaders: { 'Referer': 'https://smart-election-assistant-837090440574.us-central1.run.app' } });
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
