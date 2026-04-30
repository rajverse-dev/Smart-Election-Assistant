# Smart Election Assistant 🗳️

A full-stack web application designed to help users understand the election process in an interactive, simple, and user-friendly way. It features a voting guide, election timeline, polling booth locator, and an AI-powered chatbot assistant.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, React-Router
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Features**: i18n (English/Tamil Support), Dark/Light Mode, Interactive UI

## Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)

## Setup Instructions

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/rajverse-dev/Smart-Election-Assistant.git
cd Smart-Election-Assistant
\`\`\`

### 2. Backend Setup
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env` file in the `backend` folder and add the following:
   \`\`\`env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/smart-election # Or your MongoDB Atlas URI
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`
4. Start the backend server:
   \`\`\`bash
   npm run dev
   \`\`\`
   The server should run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   The application will be accessible at `http://localhost:5173`.

## Features Implemented
- **Home Dashboard**: Quick links to all major features.
- **Voting Guide**: Multi-step animated guide explaining the voting process.
- **Election Timeline**: Vertical timeline component showing upcoming election events.
- **Booth Locator**: (Mocked) interface to find nearby polling booths based on user location.
- **AI Chatbot**: Floating widget that communicates with the backend (ready to be hooked up with Gemini API).
- **Theming & i18n**: Dark/Light mode support and English/Tamil language toggle.

## Future Enhancements (Advanced Features)
- Full integration of Google Maps API for real-time booth location.
- Full integration of Google Gemini API for intelligent chat responses.
- Mock voting simulation UI.
- User Authentication for personalized tracking.