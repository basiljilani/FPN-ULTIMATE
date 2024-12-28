import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, UserCircle, Settings, Users, Lightbulb, Cpu, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthUser } from '@aws-amplify/ui-react';

interface NavbarProps {
  user?: AuthUser;
  onSignOut?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSignOut }) => {
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0F17] shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-white flex items-center">
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
                  <Activity className="h-8 w-8 mr-2 text-indigo-400" />
                </motion.div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                  FinTech Pulse Network
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/ai-companion" className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Cpu className="h-4 w-4 mr-1" />
              Pulse AI
            </Link>
            <Link to="/insights" className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              Insights
            </Link>
            <Link to="/community" className="text-white hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Community
            </Link>
            <div className="relative ml-4">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 text-white hover:text-[#8B5CF6] transition-colors"
              >
                <UserCircle className="h-6 w-6" />
                {user?.username && (
                  <span className="hidden md:inline">{user.username}</span>
                )}
              </button>

              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#0B0F17] ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={onSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white"
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-400 focus:outline-none"
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
          className="md:hidden bg-gray-900"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/ai-companion" className="text-white hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium">Pulse AI</Link>
            <Link to="/insights" className="text-white hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium">Insights</Link>
            <Link to="/community" className="text-white hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium">Community</Link>
            <Link to="/profile" className="text-white hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
            <Link to="/settings" className="text-white hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium">Settings</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;