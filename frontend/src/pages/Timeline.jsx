import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch mock data from backend
    fetch('http://localhost:5000/api/timeline')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch timeline', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading timeline...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Election Timeline</h1>
        <p className="text-gray-600 dark:text-gray-400">Stay up to date with important election milestones.</p>
      </div>

      <div className="relative border-l-4 border-primary-500 ml-6 md:ml-0 md:border-l-0">
        {/* Central line for desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 dark:bg-gray-700 rounded-full"></div>

        {events.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`mb-12 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="w-full md:w-1/2"></div>
            
            <div className="absolute left-[-11px] md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-primary-600 border-4 border-white dark:border-gray-900 z-10 shadow-lg"></div>
            
            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold rounded-full mb-3">
                  {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
