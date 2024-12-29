import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { PORTAL_PATHS } from './types/auth';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Lazy load auth portals
const AdminPortal = React.lazy(() => import('./components/auth/AdminPortal'));
const EditorPortal = React.lazy(() => import('./components/auth/EditorPortal'));
const AuthorPortal = React.lazy(() => import('./components/auth/AuthorPortal'));

// Placeholder components until actual implementations are ready
const AdminDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">User Management</h2>
        <p className="text-gray-400">Manage editors and authors</p>
      </div>
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">Content Overview</h2>
        <p className="text-gray-400">Monitor all published content</p>
      </div>
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">System Settings</h2>
        <p className="text-gray-400">Configure system preferences</p>
      </div>
    </div>
  </div>
);

const EditorDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-white mb-4">Editor Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">Content Management</h2>
        <p className="text-gray-400">Review and publish articles</p>
      </div>
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">Author Management</h2>
        <p className="text-gray-400">Manage author submissions</p>
      </div>
    </div>
  </div>
);

const AuthorDashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-white mb-4">Author Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">My Articles</h2>
        <p className="text-gray-400">Manage your published content</p>
      </div>
      <div className="bg-[#1A1F2B] p-4 rounded-lg">
        <h2 className="text-xl text-white mb-2">Create New</h2>
        <p className="text-gray-400">Start writing a new article</p>
      </div>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              className="bg-[#8B5CF6] px-4 py-2 rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8B5CF6]"></div>
  </div>
);

// Configure Amplify
const amplifyConfig = {
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_AWS_REGION as string,
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID as string,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID as string,
      signUpVerificationMethod: 'code',
      authenticationFlowType: 'USER_SRP_AUTH',
      oauth: {
        domain: import.meta.env.VITE_AWS_OAUTH_DOMAIN as string,
        scope: ['email', 'openid', 'profile'],
        redirectSignIn: import.meta.env.VITE_REDIRECT_SIGN_IN?.split(',') || [],
        redirectSignOut: import.meta.env.VITE_REDIRECT_SIGN_OUT?.split(',') || [],
        responseType: 'code'
      }
    }
  }
} as const;

Amplify.configure(amplifyConfig);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Router>
          <div className="min-h-screen bg-[#0B0F17]">
            <Navbar />
            <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/insights" replace />} />
                <Route path="/insights" element={
                  <div className="p-8">
                    <h1 className="text-2xl font-bold text-white">Insights</h1>
                  </div>
                } />
                <Route path="/fintech-hub" element={
                  <div className="p-8">
                    <h1 className="text-2xl font-bold text-white">FinTech Hub</h1>
                  </div>
                } />
                <Route path="/ai-companion" element={
                  <div className="p-8">
                    <h1 className="text-2xl font-bold text-white">AI Companion</h1>
                  </div>
                } />
                <Route path="/community" element={
                  <div className="p-8">
                    <h1 className="text-2xl font-bold text-white">Community</h1>
                  </div>
                } />

                {/* Auth portals */}
                <Route path={PORTAL_PATHS.ADMIN} element={<AdminPortal />} />
                <Route path={PORTAL_PATHS.EDITOR} element={<EditorPortal />} />
                <Route path={PORTAL_PATHS.AUTHOR} element={<AuthorPortal />} />

                {/* Protected routes */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={
                          <div className="p-8">
                            <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                          </div>
                        } />
                        <Route path="settings" element={
                          <div className="p-8">
                            <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
                          </div>
                        } />
                      </Routes>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/editor/*"
                  element={
                    <ProtectedRoute requiredRole="editor">
                      <Routes>
                        <Route path="dashboard" element={<EditorDashboard />} />
                        <Route path="articles" element={
                          <div className="p-8">
                            <h1 className="text-2xl font-bold text-white">All Articles</h1>
                          </div>
                        } />
                        <Route path="authors" element={
                          <div className="p-8">
                            <h1 className="text-2xl font-bold text-white">Manage Authors</h1>
                          </div>
                        } />
                      </Routes>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/author/*"
                  element={
                    <ProtectedRoute requiredRole="author">
                      <Routes>
                        <Route path="dashboard" element={<AuthorDashboard />} />
                        <Route path="articles" element={
                          <div className="p-8">
                            <h1 className="text-2xl font-bold text-white">My Articles</h1>
                          </div>
                        } />
                        <Route path="profile" element={
                          <div className="p-8">
                            <h1 className="text-2xl font-bold text-white">Author Profile</h1>
                          </div>
                        } />
                      </Routes>
                    </ProtectedRoute>
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
