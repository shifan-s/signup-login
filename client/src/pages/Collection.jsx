import React from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";

// Sample Spotify-themed products
const spotifyMerch = [
  {
    id: 1,
    title: "Spotify Premium Songs",
    price: 49.99,
    description: "Comfortable and stylish, perfect for music lovers.",
    image: "/hdset.jpeg",
  },
  {
    id: 2,
    title: "Spotify Vinyl Record",
    price: 29.99,
    description: "Limited edition green vinyl.",
    image: "/images/spotify-vinyl.jpg",
  },
  {
    id: 3,
    title: "Melodies",
    price: 14.99,
    description: "Start your day with music and coffee.",
    image: "/images/spotify-mug.jpg",
  },
  {
    id: 4,
    title: " Classic Songs",
    price: 24.99,
    description: "Soft cotton with Spotify logo print.",
    image: "/images/spotify-tshirt.jpg",
  },
];

const Collection = () => {
  const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

  const handleAddToCart = (item) => {
    toast.success(`${item.title} added to cart!`, { duration: 500 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 px-4 py-10 text-white">
      <Helmet>
        <title>Spotify Merch Collection</title>
      </Helmet>

      <h1 className="text-4xl font-extrabold text-center mb-12 text-green-400 drop-shadow-md">
        Spotify Merch Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {spotifyMerch.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold text-green-300 mb-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-300 mb-2">
                {formatPrice(item.price)}
              </p>
              {item.description && (
                <p className="text-sm text-gray-400 mb-3">{item.description}</p>
              )}
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-md shadow-md transition"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
