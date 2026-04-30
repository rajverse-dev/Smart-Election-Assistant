import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, BookOpen, MessageSquare } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('voting_guide'),
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      link: '/guide',
      description: 'Step-by-step guide on how to register and cast your vote.',
      color: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: t('timeline'),
      icon: <CalendarDays className="w-8 h-8 text-purple-500" />,
      link: '/timeline',
      description: 'Important dates and deadlines you need to remember.',
      color: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: t('find_booth'),
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      link: '/locator',
      description: 'Locate the polling booths near your current location.',
      color: 'bg-green-100 dark:bg-green-900/30'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          {t('welcome')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your one-stop platform for a seamless voting experience. Get informed, stay updated, and make your vote count.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={card.link} className={`block p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${card.color}`}>
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{card.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {card.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-primary-600 to-purple-600 text-white text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg opacity-90 mb-6">Our AI-powered Smart Election Assistant is here to help 24/7.</p>
          <button className="bg-white text-primary-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center mx-auto gap-2">
            <MessageSquare className="w-5 h-5" />
            Try the Chatbot (Bottom Right)
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
