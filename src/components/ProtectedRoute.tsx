import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { CognitoUser, UserRole, ROLE_PERMISSIONS } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const location = useLocation();
  const { user } = useAuthenticator((context) => [context.user]);
  const cognitoUser = user as CognitoUser | undefined;

  if (!cognitoUser) {
    // Redirect to the appropriate portal based on the required role
    return <Navigate to={`/${requiredRole}`} state={{ from: location }} replace />;
  }

  const userRole = cognitoUser.attributes?.['custom:role'] as UserRole;
  
  // Check if user has permission to access this route
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  const requiredPath = `/${requiredRole}`;
  
  if (!userPermissions.includes(requiredPath)) {
    // If user doesn't have permission, redirect to their default portal
    return <Navigate to={`/${userRole}`} replace />;
  }

  // Authorized, render children
  return <>{children}</>;
};

export default ProtectedRoute;
