import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Simulation = lazy(() => import('./pages/Simulation'));
const VotingGuide = lazy(() => import('./pages/VotingGuide'));
const Timeline = lazy(() => import('./pages/Timeline'));
const BoothLocator = lazy(() => import('./pages/BoothLocator'));

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
        <Toaster position="top-right" />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense fallback={<div className="flex items-center justify-center h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/guide" element={<VotingGuide />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/locator" element={<BoothLocator />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
