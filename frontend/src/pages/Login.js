// src/pages/Login.js
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"; 

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => loginWithRedirect()}
        className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
