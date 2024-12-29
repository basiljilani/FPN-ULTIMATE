import React, { Suspense } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FolderOpen,
  PlusCircle,
  Settings,
  Loader
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

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
    console.error('AdminLayout Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-[#0B0F17]">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-[#8B5CF6] rounded hover:bg-[#7C3AED]"
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

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-[#0B0F17]">
    <Loader className="w-8 h-8 text-[#8B5CF6] animate-spin" />
  </div>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/articles', icon: FileText, label: 'Articles' },
    { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/admin/create-article', icon: PlusCircle, label: 'New Article' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="flex h-screen bg-[#0B0F17]">
          {/* Sidebar */}
          <div className="w-64 bg-[#1A1F2B] text-white">
            <div className="p-4">
              <h2 className="text-xl font-bold text-[#8B5CF6]">Admin Panel</h2>
            </div>
            <nav className="mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm ${
                    isActiveRoute(item.path)
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-gray-300 hover:bg-[#2D3748] hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AdminLayout;
