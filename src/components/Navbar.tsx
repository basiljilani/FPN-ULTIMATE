import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, UserCircle, Settings, Users, Lightbulb, Cpu, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface CognitoUserAttributes {
  email?: string;
  'custom:role'?: string;
  [key: string]: string | undefined;
}

interface CognitoUser {
  attributes?: CognitoUserAttributes;
  username?: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const cognitoUser = user as CognitoUser | undefined;

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

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAdmin = cognitoUser?.attributes?.['custom:role'] === 'admin';
  const userEmail = cognitoUser?.attributes?.email;

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
                  <Activity className="h-8 w-8 text-[#8B5CF6] mr-2" />
                </motion.div>
                FinTech Pulse
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/insights" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Insights
            </Link>
            <Link to="/fintech-hub" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              FinTech Hub
            </Link>
            <Link to="/ai-companion" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              AI Companion
            </Link>
            <Link to="/community" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Community
            </Link>

            {cognitoUser ? (
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center text-gray-300 hover:text-white"
                >
                  <UserCircle className="h-6 w-6" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1F2B] ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white flex items-center"
                        >
                          <Cpu className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white flex items-center"
                      >
                        <UserCircle className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white flex items-center"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#8B5CF6] hover:text-white flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/admin"
                className="bg-[#8B5CF6] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#7C3AED]"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1F2B]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/insights"
              className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
            >
              Insights
            </Link>
            <Link
              to="/fintech-hub"
              className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
            >
              FinTech Hub
            </Link>
            <Link
              to="/ai-companion"
              className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
            >
              AI Companion
            </Link>
            <Link
              to="/community"
              className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
            >
              Community
            </Link>
            {cognitoUser ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
                >
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/admin"
                className="block bg-[#8B5CF6] text-white px-3 py-2 rounded-md text-base font-medium hover:bg-[#7C3AED] mx-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;