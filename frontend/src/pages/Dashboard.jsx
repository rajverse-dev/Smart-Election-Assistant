import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { UserCheck, CheckCircle2, Clock, MapPin, MessageSquare, AlertCircle, TrendingUp, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const [firstTimeVoter, setFirstTimeVoter] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock Progress
  const totalSteps = 5;
  const completedSteps = 3;
  const progressPercent = (completedSteps / totalSteps) * 100;

  // Fetch Dashboard Data
  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        return res.json();
      })
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load dashboard data. Please make sure the backend is running.');
        setLoading(false);
      });
  }, []);

  // Countdown Logic
  useEffect(() => {
    if (!dashboardData?.electionData?.votingDate) return;

    const electionDate = new Date(dashboardData.electionData.votingDate);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = electionDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dashboardData]);

  // Smart Notifications
  useEffect(() => {
    toast.success('Welcome back! You have 2 pending steps for registration.', {
      icon: '🔔',
      duration: 4000,
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Loading your dynamic dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-red-500 bg-red-50 dark:bg-red-900/30 p-4 rounded-xl inline-block">{error}</p>
      </div>
    );
  }

  const { electionData, recentQueries } = dashboardData;

  // Chart Data preparation based on real data
  const genderData = [
    { name: 'Male', value: electionData.male, color: '#3b82f6' },
    { name: 'Female', value: electionData.female, color: '#ec4899' }
  ];
  
  const statsData = [
    { name: 'Male', count: electionData.male },
    { name: 'Female', count: electionData.female },
    { name: 'First-Time', count: electionData.firstTimeVoters }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your voting journey and stay informed.</p>
        </div>
        
        {/* First Time Voter Toggle */}
        <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">First-Time Voter</span>
          <button 
            onClick={() => setFirstTimeVoter(!firstTimeVoter)}
            className={`w-12 h-6 rounded-full transition-colors relative ${firstTimeVoter ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${firstTimeVoter ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Smart Guidance for First-Time Voters */}
      {firstTimeVoter && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-4"
        >
          <AlertCircle className="w-6 h-6 text-blue-500 mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-blue-800 dark:text-blue-300">New Voter Guide Active</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
              Since this is your first time, we recommend checking the <Link to="/guide" className="underline font-bold">Voting Guide</Link> first. Make sure your Form 6 is submitted before the deadline.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* User Overview Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Status: Registered</h2>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Verified User</p>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Expected Turnout:</p>
            <p className="font-medium text-gray-800 dark:text-gray-200 text-2xl">{electionData.turnout}%</p>
          </div>
        </motion.div>

        {/* Progress Tracker Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Voting Journey</h2>
            <span className="text-primary-600 dark:text-primary-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary-500 to-purple-500 h-2.5 rounded-full"
            ></motion.div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {completedSteps} of {totalSteps} steps completed. <Link to="/guide" className="text-primary-500 hover:underline">Continue</Link>
          </p>
        </motion.div>

        {/* Countdown Timer Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-primary-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-2 mb-4 opacity-90">
            <Clock className="w-5 h-5" />
            <h2 className="text-lg font-bold">Election Countdown</h2>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-center">
              <span className="text-4xl font-extrabold block">{timeLeft.days}</span>
              <span className="text-xs uppercase tracking-wider opacity-80">Days</span>
            </div>
            <span className="text-2xl font-bold opacity-50">:</span>
            <div className="text-center">
              <span className="text-4xl font-extrabold block">{timeLeft.hours}</span>
              <span className="text-xs uppercase tracking-wider opacity-80">Hours</span>
            </div>
            <span className="text-2xl font-bold opacity-50">:</span>
            <div className="text-center">
              <span className="text-4xl font-extrabold block">{timeLeft.minutes}</span>
              <span className="text-xs uppercase tracking-wider opacity-80">Mins</span>
            </div>
          </div>
          <p className="text-center text-xs mt-4 opacity-75">Voting starts in {timeLeft.days} days!</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics Section (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" /> Election Statistics
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">Voters by Gender</p>
            </div>
            <div className="w-full md:w-2/3 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData}>
                  <XAxis dataKey="name" stroke="#8884d8" fontSize={12} />
                  <YAxis stroke="#8884d8" fontSize={12} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Voter Demographic Counts</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Polling Booth & Chat Activity */}
        <div className="space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-500" /> Nearest Booth
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Govt. High School, Block A</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">1.2 km away</p>
            </div>
            <Link to="/locator" className="w-full block text-center bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-800/50 dark:text-green-400 font-bold py-2 rounded-lg transition-colors">
              Open in Maps
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" /> Recent Assistant Queries
            </h2>
            {recentQueries && recentQueries.length > 0 ? (
              <ul className="space-y-3">
                {recentQueries.map((query, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> "{query}"
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">No recent queries. Try asking the assistant a question!</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
