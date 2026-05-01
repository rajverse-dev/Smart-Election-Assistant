import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Fingerprint, Volume2 } from 'lucide-react';

const candidates = [
  { id: 1, name: 'Candidate A', party: 'Progressive Party', symbol: '🌟' },
  { id: 2, name: 'Candidate B', party: 'Liberty Union', symbol: '🦅' },
  { id: 3, name: 'Candidate C', party: 'Green Future', symbol: '🌳' },
  { id: 4, name: 'NOTA', party: 'None of the Above', symbol: '❌' }
];

const Simulation = () => {
  const { t } = useTranslation();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = (candidate) => {
    if (voted) return;

    setSelectedCandidate(candidate);
    
    // Simulate EVM Beep Sound
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 1000);

    setVoted(true);
    toast.success(`Vote cast successfully for ${candidate.name}!`, {
      icon: '✅',
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const resetSimulation = () => {
    setVoted(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Electronic Voting Machine (EVM) Simulator</h1>
        <p className="text-gray-600 dark:text-gray-400">Experience how to cast your vote on a standard EVM.</p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-8 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0" />
        <p className="text-sm text-yellow-800 dark:text-yellow-400">
          <strong>Disclaimer:</strong> This is a mock simulation for educational purposes only. Your selection is not recorded anywhere.
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto border-8 border-gray-300 dark:border-gray-700 relative overflow-hidden">
        {/* EVM Header Panel */}
        <div className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-xl mb-6 shadow-inner">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-6 h-6 text-green-400" />
            <span className="font-mono text-lg tracking-widest text-green-400">READY</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <div className={`w-3 h-3 rounded-full ${voted ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-gray-600'}`}></div>
          </div>
        </div>

        {/* Candidate List (Ballot Unit) */}
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className={`flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border-2 transition-all ${
                selectedCandidate?.id === candidate.id 
                  ? 'border-primary-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl bg-gray-50 dark:bg-gray-800 w-12 h-12 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700">
                  {candidate.symbol}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{candidate.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.party}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Voting Light Indicator */}
                <div className={`w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 ${
                  selectedCandidate?.id === candidate.id ? 'bg-red-500 border-red-500 shadow-[0_0_10px_red]' : ''
                }`}></div>
                
                {/* Blue Voting Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={voted}
                  onClick={() => handleVote(candidate)}
                  className={`w-16 h-10 rounded-full bg-blue-600 border-b-4 border-blue-800 flex items-center justify-center shadow-md ${
                    voted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500 hover:border-blue-700 active:border-b-0 active:mt-1'
                  }`}
                >
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {voted && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vote Recorded</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">A long beep sound indicates your vote has been successfully cast.</p>
                <button 
                  onClick={resetSimulation}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors"
                >
                  Restart Simulation
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Simulation;
