// src/pages/Callback.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    const handleAuth = async () => {
      await handleRedirectCallback();
    };
    handleAuth();
  }, [handleRedirectCallback]);

  return <div>Loading...</div>; // You can customize this loading message
};

export default Callback;
