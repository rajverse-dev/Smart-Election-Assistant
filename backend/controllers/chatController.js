exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    // TODO: Integrate actual Google Gemini API here
    // Mock response for now
    let reply = "I am the Smart Election Assistant. How can I help you today?";
    
    if (message.toLowerCase().includes('vote')) {
      reply = "To vote, you need to be a citizen of India and above 18 years of age. Make sure you are registered and have your Voter ID.";
    } else if (message.toLowerCase().includes('document')) {
      reply = "You will need an identity proof like Voter ID, Aadhaar Card, PAN Card, or Driving License to cast your vote.";
    } else if (message.toLowerCase().includes('eligible')) {
      reply = "You are eligible if you are 18 or older and your name is on the electoral roll.";
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
