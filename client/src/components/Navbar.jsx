import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/");
      } else toast.error(data.message);
    } catch {
      toast.error("Logout failed. Please try again.");
    }
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="relative h-20 bg-gradient-to-r from-blue-500 via-pink-400 to-blue-300 shadow-md flex items-center justify-between px-4 md:px-10">
      {/* Logo */}
      <Link
        to="/"
        className="text-4xl font-black text-white tracking-widest font-serif hover:text-yellow-100"
        onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}
      >
        Liza
      </Link>

      {/* Mobile Toggle */}
      <button
        onClick={() => {
          setMobileMenuOpen(!mobileMenuOpen);
          setDropdownOpen(false);
        }}
        className="md:hidden text-white"
        type="button"
      >
        {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-8 text-white font-medium">
        <li>
          <Link to="/" className="hover:text-yellow-100">Home</Link>
        </li>
        {auth?.user && (
          <>
            <li>
              <Link to="/collection" className="hover:text-yellow-100">Collection</Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center hover:text-yellow-100"
                type="button"
              >
                {auth.user.role} <ArrowDropDownIcon />
              </button>
              {dropdownOpen && <Dropdown user={auth.user} />}
            </li>
          </>
        )}
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {!auth?.user ? (
          <>
            <Link to="/login" className="text-white hover:text-yellow-100 font-medium">Login</Link>
            <Link to="/signup" className="px-4 py-1.5 rounded-full bg-white text-pink-600 font-semibold shadow hover:bg-yellow-50">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-white hover:text-yellow-100 font-medium" type="button">Logout</button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 text-white flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-100">Home</Link>

          {auth?.user ? (
            <>
              <Link to="/collection" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-100">Collection</Link>

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-yellow-100"
                type="button"
              >
                {auth.user.role}
                <ArrowDropDownIcon className={`${dropdownOpen ? "rotate-180" : ""} transition-transform`} />
              </button>
              {dropdownOpen && <Dropdown user={auth.user} />}

              <button onClick={handleLogout} className="text-white hover:text-yellow-100" type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-100">Login</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="hover:text-yellow-100">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

