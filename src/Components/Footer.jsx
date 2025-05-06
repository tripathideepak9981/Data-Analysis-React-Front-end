import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaPinterestP,
  FaInstagram,
  FaRobot,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contacts"
      className="relative w-full overflow-hidden font-sans bg-[#080a1a] text-gray-300 pt-10"
    >
      {/* Footer Content */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Section */}
          <div className="p-10 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
              Modern AI Data Analysis
            </h2>
            <p className="text-sm text-gray-200 mb-4">
              Upload your Excel or CSV files and get instant insights with AI.
              Generate charts, explore patterns, and even build SQL queries — no
              coding needed.
            </p>
            <div className="flex mt-10">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-md w-full bg-[#0e1029] border border-[#2f3163] placeholder-gray-400 text-white focus:outline-none"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition font-semibold">
                ➤
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-10 md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Services */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Services
                </h3>
                <ul className="space-y-2 text-sm">
                  {[
                    "Upload Excel/CSV",
                    "Live Database Connection",
                    "AI Data Analysis",
                    "Chart Generator",
                    "SQL Query Builder",
                    "No-Code Interface",
                    "Customer Support",
                  ].map((item, index) => (
                    <li key={index}>
                      <span
                        to="#"
                        className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 
                          before:w-2 before:h-1 before:bg-white"
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info */}
              <div className="ml-10">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Information
                </h3>
                <p className="text-base mb-2">
                  <span className="text-gray-200 font-semibold">Phone:</span>{" "}
                  +91 9981633129
                </p>
                <p className="text-base mb-2">
                  <span className="text-gray-200 font-semibold">Email:</span>{" "}
                  tripathideepak9981@gmail.com
                </p>
                <p className="text-base mb-4">
                  <span className="text-gray-200 font-semibold">Location:</span>{" "}
                  Bhopal (Madhya Pradesh)
                </p>
                <div className="flex gap-3">
                  {[
                    FaFacebookF,
                    FaTwitter,
                    FaGoogle,
                    FaPinterestP,
                    FaInstagram,
                  ].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-9 h-9 bg-[#0e1029] hover:bg-purple-600 text-white rounded-md flex items-center justify-center transition"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="text-center py-4 text-sm bg-[#0e1029] text-gray-400">
          © 2025{" "}
          <span className="text-purple-400 font-semibold">
            Data Analysis Bot
          </span>{" "}
          All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
