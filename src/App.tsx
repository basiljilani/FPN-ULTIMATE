import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Article from './pages/Article';
import ArticleView from './pages/ArticleView';
import AiCompanion from './pages/AiCompanion';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Community from './pages/Community';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import FinancialNews from './pages/FinancialNews';
import About from './pages/About';
import FinTechHub from './pages/FinTechHub';
import ArticleManager from './pages/ArticleManager';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserManager from './pages/UserManager';
import ManageCategories from './pages/ManageCategories';
import { setupAxios } from './lib/axios.config';

const isProd = import.meta.env.VITE_PROD === 'true';

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: 'us-east-1gmmabocdr.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: isProd 
            ? ['https://d84l1y8p4kdic.cloudfront.net']
            : ['http://localhost:5001'],
          redirectSignOut: isProd
            ? ['https://d84l1y8p4kdic.cloudfront.net']
            : ['http://localhost:5001'],
          responseType: 'code'
        }
      }
    }
  }
});

interface NavbarProps {
  user: any;
  onSignOut?: () => void;
}

function App() {
  useEffect(() => {
    setupAxios();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="flex flex-col min-h-screen bg-[#0B0F17]">
            <Navbar user={user} onSignOut={signOut} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/fintech-hub" element={<FinTechHub />} />
                <Route path="/insights/:id" element={<ArticleView />} />
                <Route path="/ai-companion" element={<AiCompanion />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/community" element={<Community />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/financial-news" element={<FinancialNews />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManager />} />
                <Route path="/admin/categories" element={<ManageCategories />} />
                <Route path="/admin/articles" element={<ArticleManager />} />
                <Route path="/admin/create-article" element={<CreateArticle />} />
                <Route path="/admin/edit-article/:id" element={<EditArticle />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
