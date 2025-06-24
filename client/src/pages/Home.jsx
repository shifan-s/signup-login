import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import CreateCollection from "./Admin/CreateCollection";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

 const images = [
  "src/pages/guitar.jpg",
  "src/pages/piano.jpg",
  "src/pages/drums.jpg",
  "src/pages/microphone.jpg",
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleExploreClick = () => {
    navigate("/collection");
  };

  return (
    <div className="relative h-screen w-full">
      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* Auth Info Display */}
      

      {/* Background Image */}
      <img
        src="logoss.jpg"
        alt="Spotify"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Welcome to Spotify!
          </h1>
         
          <p className="text-lg md:text-2xl mb-8 max-w-xl mx-auto drop-shadow-md text-blue-800">
  Enjoy the best music experience from us! Dive into your favourite tunes and discover new sounds.
          </p>
          <button
            onClick={handleExploreClick}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition-all duration-300 ease-in-out"
          >
            Favourites ❤
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
