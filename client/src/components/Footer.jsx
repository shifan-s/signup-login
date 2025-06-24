import { FaInstagram, FaPinterest, FaTwitter, FaFacebook, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium">
          <li><a href="/" className="hover:text-violet-600 transition">Shop</a></li>
          <li><a href="#" className="hover:text-violet-600 transition">About</a></li>
          <li><a href="#" className="hover:text-violet-600 transition">Blog</a></li>
          <li><a href="#" className="hover:text-violet-600 transition">Pricing</a></li>
          <li><a href="#" className="hover:text-violet-600 transition">Contact</a></li>
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {/* Instagram */}
          <a href="#" title="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition">
            <FaInstagram className="w-5 h-5" />
          </a>

          {/* Pinterest */}
          <a href="/collection" title="Pinterest" className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition">
            <FaPinterest className="w-5 h-5" />
          </a>

          {/* Twitter */}
          <a href="#" title="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition">
            <FaTwitter className="w-5 h-5" />
          </a>

          {/* Facebook */}
          <a href="#" title="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition">
            <FaFacebook className="w-5 h-5" />
          </a>

          {/* Gmail (Google) */}
          <a href="#" title="Gmail" className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition">
            <FaGoogle className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-6">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
