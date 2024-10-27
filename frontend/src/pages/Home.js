// src/pages/Home.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
// import bgpic from "../images/fullcalendar1.jpg"
import bgpic from "../images/fullcalendar.jpg"
// import bgpic from "../images/cards.jpg"

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="relative w-full h-screen bg-cover bg-center"  style={{ backgroundImage: `url(${bgpic})` }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg shadow-purple-500"></div> {/* Overlay for better text visibility */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-purple-100 text-center p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Calendar App</h1>
        <p className="text-lg mb-6">Manage your events and meetings with ease.</p>
        <button
          onClick={loginWithRedirect}
          className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          Log In / Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
