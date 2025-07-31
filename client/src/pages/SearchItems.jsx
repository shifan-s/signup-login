import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchContext from "../context/SearchContext";

const SearchItems = () => {
  const [values] = useContext(SearchContext);

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Search Results
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {values.results.length < 1
            ? "No Products Found"
            : `Found ${values.results.length}`}
        </p>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {values.results.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow hover:shadow-lg"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                alt={item.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="font-bold text-gray-800 mb-3">₹{item.price}</p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/product/${item.slug}`}
                    className="flex-1 text-center bg-purple-600 text-white py-2 rounded text-sm hover:bg-purple-700"
                  >
                    More Details
                  </Link>
                  <button className="flex-1 bg-pink-600 text-white py-2 rounded text-sm hover:bg-pink-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchItems;