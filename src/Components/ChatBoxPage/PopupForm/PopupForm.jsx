import { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { connectToDatabase } from "../../../Api";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const PopupForm = ({ dbType, isOpen, onClose, setDbResponse }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    db_type: dbType,
    host: "",
    port: "",
    database: "",
    user: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await connectToDatabase(formData);
      if (response.error) {
        Swal.fire({
          icon: "error",
          title: "Could not connect to database",
          text: "Something went wrong",
          confirmButtonText: "OK",
        });
      } else {
        setDbResponse(response);
        Swal.fire({
          icon: "success",
          title: "Database Connected!",
          text: "Connection established successfully",
          confirmButtonText: "OK",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-3">
      <div className="w-full -mt-12 max-w-[30vw] bg-white rounded-3xl shadow-2xl px-6 py-3 pt-4 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-purple-600 transition-transform hover:scale-105"
          title="Close"
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-6 border-b border-gray-200 pb-2">
          Enter Database Details
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Common Input Fields */}
          {[
            { label: "Database Host", name: "host" },
            { label: "Database Port", name: "port" },
            { label: "Database Name", name: "database" },
            { label: "Username", name: "user" },
          ].map(({ label, name }, index) => (
            <div key={index}>
              <label
                htmlFor={name}
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 shadow-sm transition"
              />
            </div>
          ))}

          {/* Password Field with Toggle Eye */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-800 shadow-sm transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[34px] right-3 text-gray-500 hover:text-indigo-600 transition"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Connect to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
