import { useState } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);

      recognition.start();
    }
  };

  return (
    <div className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 rounded-b-2xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about voting..."
            className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary-500 rounded-full pl-4 pr-10 py-2.5 outline-none text-sm text-gray-900 dark:text-white transition-all shadow-inner"
          />
          <button 
            type="button"
            onClick={toggleMic}
            className={`absolute right-2 p-1.5 rounded-full transition-colors ${isListening ? 'text-red-500 bg-red-100 dark:bg-red-900/30 animate-pulse' : 'text-gray-400 hover:text-primary-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
        </div>
        
        <button 
          type="submit" 
          disabled={!input.trim()}
          className="p-2.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
