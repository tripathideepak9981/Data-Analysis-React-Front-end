import { Button } from "./ui/button";
import { Menu, UserCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuCircleUser } from "react-icons/lu";

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

  // Click outside for dropdown
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
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DataAnalyst</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-semibold">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors">Demo</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Desktop Buttons or Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn() ? (
              <div ref={userIconRef} className="relative">
                {/* <img
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  src={user2}
                  className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition"
                  alt="User"
                /> */}
                <UserCircle   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 size={10}  className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition " color="gray"
                 />
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-14 w-72 bg-white rounded-xl border border-gray-200 shadow-2xl p-4 z-50 animate-fade-in"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {/* <img
                        src={user2}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full shadow-md"
                      /> */}
                      <UserCircle size={12} color="gray" className="w-12 h-12 bg-white "
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{username || "User"}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[150px]">
                          example@email.com
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 mb-4"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 mt-2 rounded-md transition-all duration-300"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600" onClick={handleSignIn}>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors">Demo</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>

              <div className="flex flex-col space-y-2 pt-4">
                {isLoggedIn() ? (
                  <>
                    <div className="flex items-center gap-3">
                      <LuCircleUser className="w-10 h-10 rounded-full shadow-md"/>
                      <div>
                        <div className="font-semibold text-gray-900">{username || "User"}</div>
                      </div>
                    </div>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white mt-2"
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start font-semibold" onClick={handleSignIn}>
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
      </div>
    </header>
  );
};

export default Navigation;
