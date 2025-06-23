import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { logoutUser } from "../Api";
import user2 from "../assets/icons/user2.jpg";

const Navbar = ({ isLoggedIn, username, setUsername }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setUsername(null);
    try {
      const response = await logoutUser();
      console.log("Logout response:", response);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleSignIn = () => navigate("/signInPage");
  const handleSignUp = () => navigate("/signUp");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md backdrop-blur-md font-[Inter]">
      <div className="max-w-8xl mx-auto px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-extrabold tracking-wide font-[Inter] transition-transform duration-300 transform hover:scale-[1.07] hover:-translate-y-1 drop-shadow-2xl group">
          {/* Robot Icon */}
          <FaRobot className="text-3xl text-[#2d1b54] drop-shadow-md transition duration-300" />

          {/* Gradient Text with Glow and Shadow */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d2869] to-[#33205c] ">
            Data Analysis
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-[#2d1b54] font-semibold text-lg">
          {["Home", "About", "Services", "Contacts"].map((text, i) => (
            <a
              key={i}
              href={`#${text.toLowerCase()}`}
              className="relative group hover:scale-105 transition duration-300"
            >
              <span>{text}</span>
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {isLoggedIn() ? (
            <>
              <button
                ref={userIconRef}
                onClick={toggleDropdown}
                className="group p-1 rounded-full transition-all duration-300"
                title="My Profile"
              >
                <img
                  src={user2}
                  className="w-10 h-10 rounded-full shadow-md hover:scale-110 transition"
                />
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-12 top-16 bg-white shadow-2xl rounded-xl p-6 w-64 border border-gray-200 transition-all duration-300"
                >
                  <div className="flex flex-row items-center justify-center gap-3 mb-6">
                    <img
                      src={user2}
                      className="w-10 h-10 rounded-full shadow-md"
                    />
                    <div className="text-gray-700 font-semibold hover:text-indigo-700 cursor-pointer">
                      My Profile
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="border-t border-gray-200"></div>

                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>User Email</span>
                      <span className="text-gray-800 font-semibold truncate max-w-[120px]">
                        {username}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Admin:</span>
                      <span className="text-[#2d1b54] font-semibold cursor-pointer hover:underline">
                        Manage Product
                      </span>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    <button
                      onClick={handleLogout}
                      className="bg-[#2d1b54] hover:bg-[#24124b] text-white font-semibold py-2 rounded-md transition-all duration-300 mx-8"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleSignUp}
                className="px-6 py-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 text-white font-semibold tracking-wide shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition duration-300"
              >
                Sign Up
              </button>

              <button
                onClick={handleSignIn}
                className="px-6 py-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-purple-400/50 hover:-translate-y-1 transition duration-300"
              >
                Sign In
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#2d1b54] focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-md rounded-b-xl transition">
          <div className="flex flex-col space-y-3 text-[#2d1b54] font-semibold">
            {["Home", "About", "Services", "Contacts"].map((text, i) => (
              <Link
                key={i}
                to={`/${text.toLowerCase()}`}
                className="hover:text-[#38356c] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {text}
              </Link>
            ))}

            {isLoggedIn() ? (
              <>
                <span className="text-sm">{username}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleSignUp();
                    setIsMenuOpen(false);
                  }}
                  className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    handleSignIn();
                    setIsMenuOpen(false);
                  }}
                  className="text-white bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
