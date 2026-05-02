import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import { logEvent } from '../../firebase';

const SUGGESTIONS = [
  "How to register as a voter?",
  "What are the required documents?",
  "How to find my polling booth?",
  "What is the minimum voting age?"
];

const HeroChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am VoteMate AI. How can I help you today?", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Generate a cryptographically secure UUID for the session
  const sessionRef = useRef(
    localStorage.getItem('voteMateSessionId') || 
    (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem('voteMateSessionId', sessionRef.current);
    
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/chat/${sessionRef.current}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            const history = data.messages.map(msg => ({
              text: msg.content,
              sender: msg.role === 'user' ? 'user' : 'bot'
            }));
            setMessages(prev => [prev[0], ...history]);
          }
        }
      } catch (err) {
        console.error("Could not fetch chat history", err);
      }
    };
    fetchHistory();
  }, []);

  const handleSendMessage = useCallback(async (text) => {
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setIsTyping(true);
    
    // Log analytics event
    logEvent('chat_message_sent', { query: text });
 
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: sessionRef.current })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }
      
      logEvent('chat_message_sent', { 
        message_length: text.length,
        session_id: sessionRef.current 
      });
 
      setMessages(prev => [...prev, { text: data.reply || "Sorry, I couldn't generate a response.", sender: 'bot' }]);
      setIsTyping(false);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: error.message || "Sorry, I'm having trouble connecting to the server.", sender: 'bot' }]);
      
      logEvent('chat_error', { 
        error_message: error.message,
        session_id: sessionRef.current 
      });
    }
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="AI Chatbot" 
      className="w-full max-w-2xl mx-auto flex flex-col h-[400px] md:h-[480px] bg-white dark:bg-gray-800 rounded-3xl shadow-[0_10px_40px_rgba(139,92,246,0.15)] overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-[0_15px_50px_rgba(139,92,246,0.2)] transition-shadow duration-500"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-4 md:p-5 flex items-center justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl leading-tight">VoteMate AI</h2>
            <p className="text-xs text-primary-100 flex items-center gap-1 opacity-90">
              <Sparkles className="w-3 h-3" /> Your 24/7 Voting Guide
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 p-4 md:p-5 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {!isTyping && messages[messages.length - 1]?.sender === 'bot' && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="px-4 pb-2 pt-1 bg-gray-50/50 dark:bg-gray-900/50 flex flex-wrap gap-2"
        >
          {SUGGESTIONS.map((suggestion, idx) => (
            <motion.button
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              onClick={() => handleSendMessage(suggestion)}
              aria-label={`Ask: ${suggestion}`}
              className="text-xs font-medium px-3 py-1.5 bg-white hover:bg-primary-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 transition-colors shadow-sm hover:shadow"
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-b-3xl">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </motion.section>
  );
};

export default HeroChat;
