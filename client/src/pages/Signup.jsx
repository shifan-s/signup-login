// Signup.jsx
import  { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/auth/signup', {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error); // More specific error logging
      toast.error('Something went wrong while signing up!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="w-full max-w-md p-8 bg-white/90 rounded-xl shadow-lg backdrop-blur-sm">
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            className="text-purple-700 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
// data/kidsWear.js
export const kidsWear = [
  {
    id: 1,
    title: "Cute Summer Dress",
    image: "/images/summer.jpg", // Image in public/images
    price: "599₹",
  },
  {
    id: 2,
    title: "Boy's Casual Shirt",
    image: "/images/shirt.webp", // Image in public/images
    price: "399₹",
  },
  {
    id: 3,
    title: "Unisex Hoodie",
    image: "/images/hoodie.jpg", // Placeholder, add your image
    price: "299₹",
  },
  {
    id: 4,
    title: "Girls Floral Skirt",
    image: "/images/skirt.jpg", // Placeholder, add your image
    price: "499₹",
  },
];