import { memo } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full mb-4 justify-start"
    >
      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mr-2 shrink-0">
        <Bot className="w-5 h-5 text-primary-600 dark:text-primary-400" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-10">
        <motion.span 
          animate={{ y: [0, -5, 0] }} 
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} 
          className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" 
        />
        <motion.span 
          animate={{ y: [0, -5, 0] }} 
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} 
          className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" 
        />
        <motion.span 
          animate={{ y: [0, -5, 0] }} 
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} 
          className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" 
        />
      </div>
    </motion.div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';

export default TypingIndicator;
