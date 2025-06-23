import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="contacts"
      className="bg-[#dbe6fd] text-gray-700 pt-12 font-sans relative z-10 shadow-inner border border-t-2 border-[#bbcffb]"
    >
      <div className="max-w-8xl">
        <div className="grid md:grid-cols-2 gap-10 border-b mx-10 md:mx-10 border-gray-300 pb-10">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🚀 Modern AI Data Analysis
            </h2>
            <p className="text-sm leading-relaxed text-gray-800 mb-6">
              Upload your Excel or CSV files and get instant insights with AI.
              Generate charts, explore patterns, and even build SQL queries — no
              coding needed.
            </p>

            {/* Newsletter Input */}
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full text-sm text-gray-800 bg-gray-100 rounded-l-md border border-gray-400 placeholder-gray-500 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-purple-400 to-indigo-500 px-4 py-2 text-white font-semibold text-sm rounded-r-md hover:scale-105 hover:shadow-md transition">
                ➤
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Services List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Services
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 font-semibold">
                {[
                  "Upload Excel/CSV",
                  "Live Database Connection",
                  "AI Data Analysis",
                  "Chart Generator",
                  "SQL Query Builder",
                  "No-Code Interface",
                  "Customer Support",
                ].map((item, index) => (
                  <li key={index} className="hover:text-purple-600 transition">
                    <span className="relative pl-5">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  +91 9981633129
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  tarunk@tanishanalytics.com
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Location:</span>{" "}
                  A-17 Gujarati Colony, Phase 1, Rohit Nagar, Bhopal, MP 462039
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-4">
                {[
                  FaFacebookF,
                  FaTwitter,
                  FaGoogle,
                  FaPinterestP,
                  FaInstagram,
                ].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-md bg-gray-100 hover:bg-purple-500 text-gray-700 hover:text-white flex items-center justify-center transition duration-300 shadow-sm hover:shadow-md"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="text-center bg-[#cbd9f7] py-5 w-[100vw] text-sm text-gray-800  border border-t-2 border-[#b2caff]">
          © 2025{" "}
          <span className="text-purple-600 font-medium">Data Analysis Bot</span>{" "}
          · All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
