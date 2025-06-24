import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 px-6 py-16">
      <Helmet><title>Page Not Found</title></Helmet>
      <div className="text-center text-white max-w-lg">
        <h2 className="text-[120px] font-extrabold tracking-wider drop-shadow-lg animate-pulse">
          404
        </h2>
        <p className="text-3xl font-semibold mb-4">Oops! Page not found.</p>
        <p className="text-lg text-white/80 mb-8">
          But don't worry, you can always go back to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
