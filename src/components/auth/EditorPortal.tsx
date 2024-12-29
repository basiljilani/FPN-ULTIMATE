import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from '../../types/auth';

const EditorPortal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-[#1A1F2B] rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Editor Portal</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage content and authors
          </p>
        </div>
        
        <Authenticator
          hideSignUp={true}
          components={{
            SignIn: {
              Header: () => (
                <div className="text-center py-4">
                  <h3 className="text-xl font-semibold text-white">Welcome Back</h3>
                </div>
              ),
            },
          }}
          services={{
            async validateCustomSignIn(user: CognitoUser) {
              const role = user?.attributes?.['custom:role'];
              if (role !== 'editor' && role !== 'admin') {
                throw new Error('Unauthorized access. Editor privileges required.');
              }
              return user;
            },
          }}
          onStateChange={(authState) => {
            if (authState === 'signedIn') {
              navigate('/editor/dashboard');
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditorPortal;
