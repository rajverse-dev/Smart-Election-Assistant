import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages, LayoutDashboard, BookOpen, CalendarDays, MapPin, MonitorPlay } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
  };

  const navLinks = [
    { path: '/dashboard', label: t('dashboard'), icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
    { path: '/guide', label: t('voting_guide'), icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { path: '/timeline', label: t('timeline'), icon: <CalendarDays className="w-4 h-4 mr-2" /> },
    { path: '/locator', label: t('find_booth'), icon: <MapPin className="w-4 h-4 mr-2" /> },
    { path: '/simulation', label: t('simulation'), icon: <MonitorPlay className="w-4 h-4 mr-2" /> }
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 flex items-center gap-2">
          <span className="text-3xl">🗳️</span> Smart Election
        </Link>
        <div className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path 
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            title={t('language')}
          >
            <Languages className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            title={t('theme')}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
