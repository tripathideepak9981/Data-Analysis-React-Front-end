import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import user2 from "../../assets/icons/user2.jpg"; // use your avatar icon
import { logoutUser } from "../../Api";

export const Navigation = ({ isLoggedIn, username, setUsername }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleSignIn = () => navigate("/signInPage");
  const handleSignUp = () => navigate("/signUp");

  const handleLogout = async () => {
    setUsername(null);
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl bg-white border-b-2 border-gray-50 shadow mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            AI Data Analysis
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors duration-300">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-violet-600 transition-colors duration-300">
              How It Works
            </a>
            <a href="#demo" className="text-gray-600 hover:text-violet-600 transition-colors duration-300">
              Demo
            </a>

            {isLoggedIn() ? (
              <>
                <div ref={userIconRef} className="relative">
                  <img
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    src={user2}
                    className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition"
                    alt="User"
                  />
{isDropdownOpen && (
  <div
    ref={dropdownRef}
    className="absolute right-0 top-14 w-72 bg-white rounded-xl border border-gray-200 shadow-2xl p-4 z-50 animate-fade-in"
  >
    {/* User Info */}
    <div className="flex items-center gap-3 mb-4">
      <img
        src={user2}
        alt="User avatar"
        className="w-12 h-12 rounded-full shadow-md"
      />
      <div>
        <div className="font-semibold text-gray-900">{username || "User"}</div>
        <div className="text-sm text-gray-500 truncate max-w-[150px]">
          example@email.com
        </div>
      </div>
    </div>

    <div className="border-t border-gray-200 mb-4"></div>

    {/* Logout button */}
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 mt-2 rounded-md transition-all duration-300"
    >
      Log Out
    </button>
  </div>
)}

                </div>
              </>
            ) : (
              <>
               <Button
                  onClick={() => {
                    handleSignUp();
                  }}
                  className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2 transition"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => {
                    handleSignIn();
                  }}
                  className="text-white bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 transition"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
