import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  user?: {
    username?: string;
    attributes?: {
      email?: string;
      'custom:role'?: string;
    };
  };
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  user, 
  children, 
  adminOnly = false 
}) => {
  if (!user) {
    // Not logged in, redirect to home page
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.attributes?.['custom:role'] !== 'admin') {
    // Not an admin, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Authorized, render children
  return <>{children}</>;
};

export default ProtectedRoute;
