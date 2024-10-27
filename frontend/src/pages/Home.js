// src/pages/Home.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTypingEffect from 'react-typing-effect';
import bgpic from "../images/fullcalendar.jpg";

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgpic})` }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg shadow-lg shadow-purple-500"></div> {/* Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-purple-100 text-center p-10">
        
        {/* Typing Text */}
        <h1 className="text-5xl font-bold mb-4">
          <ReactTypingEffect
            text={["Welcome to Your Calendar App", "Manage your events with ease"]}
            speed={100}
            eraseSpeed={50}
            eraseDelay={2000}
            typingDelay={500}
            cursorClassName="text-purple-300" // Optional: Customize cursor color
          />
        </h1>

        <p className="text-lg mb-20">Please login or signup below to access your Calendar</p>
        
        <button
          onClick={loginWithRedirect}
          className="relative px-10 py-10 text-lg font-extrabold text-black border-2 border-purple-600 bg-pink-200 transition-transform transform hover:shadow-lg hover:shadow-slate-100"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          <span className="relative z-10">Log In / Sign Up</span>
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-purple-300 rotate-12 transform origin-center -z-10"></div>
        </button>
      </div>
    </div>
  );
};

export default Home;
