import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import { EventProvider } from './context/EventContext';

// Get the root element
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Render the App within the Auth0Provider
root.render(
  <Auth0Provider
  domain={process.env.REACT_APP_AUTH0_DOMAIN}
  clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE, // Use the API Base URL as Audience
    scope: "openid profile email"
  }}
>
  <EventProvider>
    <App />
  </EventProvider>
</Auth0Provider>

);
