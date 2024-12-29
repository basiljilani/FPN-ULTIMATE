import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

interface AuthenticatorProps {
  user?: any;
  signOut?: () => void;
}

const AdminLoginContent: React.FC<AuthenticatorProps> = ({ user }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.attributes?.['custom:role'] === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <div className="text-white">Authenticating...</div>;
};

const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17]">
      <div className="max-w-md w-full">
        <Authenticator>
          {(props) => <AdminLoginContent {...props} />}
        </Authenticator>
      </div>
    </div>
  );
};

export default AdminLogin;
