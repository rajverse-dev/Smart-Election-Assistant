import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, BookOpen } from 'lucide-react';
import HeroChat from '../components/chat/HeroChat';

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
      {/* Hero Section with Chat */}
      <div className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 mb-6">
            {t('welcome')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your AI-powered platform for a seamless voting experience. Ask our smart assistant any question below to get started!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HeroChat />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
          >
            <Link to={card.link} className={`block p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 h-full`}>
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
    </div>
  );
};

export default Home;
