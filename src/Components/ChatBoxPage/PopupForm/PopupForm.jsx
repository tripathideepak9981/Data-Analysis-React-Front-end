import { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { connectToDatabase } from "../../../Api";
import Swal from "sweetalert2";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40  p-3">
      <div className="bg-white mb-16 h-[82vh] w-[40vw] max-w-[30vw] rounded-2xl shadow-2xl relative py-2 px-4 sm:px-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition"
          title="Close"
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-600 text-left mb-6 tracking-wide">
          Enter Database Details
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {[
            { label: "Database Host", name: "host" },
            { label: "Database Port", name: "port" },
            { label: "Database Name", name: "database" },
            { label: "Username", name: "user" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type = "text" }, index) => (
            <div key={index}>
              <label
                htmlFor={name}
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-1.5 bg-[#6646ab] text-white text-lg font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform duration-300 transform hover:scale-105"
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
