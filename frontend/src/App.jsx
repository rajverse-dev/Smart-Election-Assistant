import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VotingGuide from './pages/VotingGuide';
import Timeline from './pages/Timeline';
import BoothLocator from './pages/BoothLocator';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<VotingGuide />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/locator" element={<BoothLocator />} />
          </Routes>
        </main>
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;
