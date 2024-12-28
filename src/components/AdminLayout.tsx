import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FolderOpen,
  PlusCircle,
  Settings
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

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
  );
};

export default AdminLayout;
