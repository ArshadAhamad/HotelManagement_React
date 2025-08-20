import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UnauthorizedPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-extrabold text-red-500 mb-4">403</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-8">
            You don't have permission to access this page.
          </p>
          
          {user ? (
            <div className="text-sm text-gray-500 mb-6">
              Logged in as: <span className="font-medium">{user.email}</span> ({user.role})
            </div>
          ) : null}
          
          <div className="flex flex-col space-y-4 items-center">
            <Link 
              to="/" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Go to Homepage
            </Link>
            
            {user && user.role === 'admin' && (
              <Link 
                to="/admin" 
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Go to Admin Dashboard
              </Link>
            )}
            
            {user && user.role === 'staff' && (
              <Link 
                to="/staff" 
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Go to Staff Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;