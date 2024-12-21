import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, UserCircle, Settings, Zap, BookOpen, Lightbulb, Cpu, Target } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Activity className="h-8 w-8 mr-2 text-blue-600" />
                </motion.div>
                FinTech Pulse Network
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/ai-companion" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Cpu className="h-4 w-4 mr-1" />
              Pulse AI
            </Link>
            <Link to="/insights" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              Insights
            </Link>
            <Link to="/solutions" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Solutions
            </Link>
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                <UserCircle className="h-6 w-6" />
              </button>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden bg-white"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/ai-companion" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Pulse AI</Link>
            <Link to="/insights" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Insights</Link>
            <Link to="/solutions" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Solutions</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
            <Link to="/settings" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Settings</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;