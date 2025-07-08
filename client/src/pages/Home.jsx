import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-black">
      <h1 className="text-6xl font-bold mb-4">Ecommerce</h1>
      <Link
        to="/signup"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
  
    </div>
  );
};

export default Home;