const ElectionData = require('../models/ElectionData');
const Chat = require('../models/Chat');

exports.getDashboardData = async (req, res) => {
  try {
    // Fetch election data
    let electionData = await ElectionData.findOne();
    
    // Seed default data if none exists
    if (!electionData) {
      const votingDate = new Date();
      votingDate.setDate(votingDate.getDate() + 30); // 30 days from now
      
      electionData = new ElectionData({
        totalVoters: 2500000,
        turnout: 65,
        male: 1300000,
        female: 1200000,
        firstTimeVoters: 150000,
        votingDate: votingDate
      });
      await electionData.save();
    }

    // Fetch recent chat queries (last 3)
    const recentChats = await Chat.find().sort({ timestamp: -1 }).limit(3);
    const recentQueries = recentChats.map(chat => chat.query);

    res.status(200).json({
      electionData,
      recentQueries
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
