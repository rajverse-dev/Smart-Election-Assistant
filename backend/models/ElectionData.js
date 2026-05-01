const mongoose = require('mongoose');

const electionDataSchema = new mongoose.Schema({
  totalVoters: { type: Number, default: 0 },
  turnout: { type: Number, default: 0 },
  male: { type: Number, default: 0 },
  female: { type: Number, default: 0 },
  firstTimeVoters: { type: Number, default: 0 },
  votingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ElectionData', electionDataSchema);
