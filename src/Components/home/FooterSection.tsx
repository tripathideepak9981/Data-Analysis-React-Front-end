import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

export const FooterSection = () => {
  return (
    <footer id="about" className="bg-gray-900 text-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-4">
              AI Asklytics
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Upload Excel or CSV files, connect live databases, and use AI to
              get instant insights. No code, just results.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaGoogle, FaPinterestP, FaInstagram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
                  >
                    <Icon size={16} className="text-white" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                ["Features", "#features"],
                ["Demo", "#demo"],
                ["API", "#"],
                ["Security", "#"],
              ].map(([label, href], i) => (
                <li key={i}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Upload Excel/CSV",
                "Live Database Connection",
                "AI Data Analysis",
                "Chart Generator",
                "SQL Query Builder",
              ].map((item, i) => (
                <li key={i} className="text-gray-400 hover:text-violet-400 transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <span className="font-medium text-white">Phone:</span> +91 9981633129
              </li>
              <li>
                <span className="font-medium text-white">Email:</span> sample@gmail.com
              </li>
              <li>
                <span className="font-medium text-white">Location:</span>{" "}
                A-17 Gujarati Colony, Phase 1, Rohit Nagar, Bhopal, MP 462039
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-gray-800 mt-8 flex flex-col md:flex-row justify-center pt-3  items-center">
          <p className="text-gray-400 text-sm text-center">
            © 2025 <span className="text-purple-400 font-medium text-center">Data Analysis Bot</span> · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
