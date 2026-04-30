exports.getTimeline = async (req, res) => {
  try {
    const timelineEvents = [
      {
        id: 1,
        title: "Voter Registration Deadline",
        date: "2024-03-15",
        description: "Last date to register as a new voter."
      },
      {
        id: 2,
        title: "Candidate Nominations",
        date: "2024-03-25",
        description: "Last date for candidates to file their nominations."
      },
      {
        id: 3,
        title: "Campaign Period Ends",
        date: "2024-04-10",
        description: "All public campaigning must stop 48 hours before voting."
      },
      {
        id: 4,
        title: "Voting Day",
        date: "2024-04-15", // A date in the future for countdown
        description: "Cast your vote at your designated polling booth."
      },
      {
        id: 5,
        title: "Results Announced",
        date: "2024-04-20",
        description: "Counting of votes and declaration of results."
      }
    ];
    res.status(200).json(timelineEvents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch timeline data" });
  }
};
