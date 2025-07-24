import { Button } from "./ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Api";

const Navigation = ({ isLoggedIn, username, setUsername }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Close dropdown on outside click
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-gray-200 shadow" : "bg-white/90"
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex justify-between items-center h-16">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-base">AI</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Asklytics</span>
        </div>

        {/* Right: Navigation + Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Nav Links */}
          <nav className="flex items-center space-x-8 text-base">
            <a href="#features" className="group relative text-gray-700 font-semibold transition-colors hover:text-blue-600">
              Features
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#demo" className="group relative text-gray-700 font-semibold transition-colors hover:text-blue-600">
              Demo
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="group relative  text-gray-700 font-semibold transition-colors hover:text-blue-600">
              About
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="group relative  text-gray-700 font-semibold transition-colors hover:text-blue-600">
              Contact
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Auth Buttons */}
          {isLoggedIn() ? (
            <div ref={userIconRef} className="relative pl-3">
              <User
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                size={24}
                className="w-10 h-10 p-2 rounded-full cursor-pointer transition hover:scale-105 bg-gray-100 text-gray-500 border border-gray-300"
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
                >
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                    <div className="w-8 h-8 flex items-center justify-center text-white text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md">
                      {username?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{username}</h4>
                    </div>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-b-xl cursor-pointer transition-all"
                  >
                    <LogOut size={16} />
                    Log Out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" className="text-gray-700 font-semibold text-base hover:text-blue-600" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSignUp}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200 px-6">
          <nav className="flex flex-col space-y-4">
            <a href="#features" className=" text-gray-700 font-semibold hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#demo" className=" text-gray-700 font-semibold hover:text-blue-600 transition-colors">
              Demo
            </a>
            <a href="#about" className=" text-gray-700 font-semibold hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#contact" className=" text-gray-700 font-semibold hover:text-blue-600 transition-colors">
              Contact
            </a>

            <div className="flex flex-col space-y-2 pt-4">
              {isLoggedIn() ? (
                <>
                  <span className="flex items-center px-4 py-2 text-sm text-gray-700">
                    <User size={16} className="mr-3" />
                    {username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start font-semibold w-full text-left"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSignUp}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
