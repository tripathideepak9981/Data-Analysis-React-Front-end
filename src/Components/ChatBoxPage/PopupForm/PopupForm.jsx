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
      console.log(response);
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
          title: "Database Connected Success!",
          text: "Connection Established",
          confirmButtonText: "OK",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 overflow-y-auto">
      <div className="bg-white w-[40vw] max-w-xl mx-auto rounded-2xl shadow-2xl relative px-4 py-6 sm:px-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-blue-700 transition"
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 text-center mb-6 underline">
          Enter Database Details
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Database Host", name: "host" },
            { label: "Database Port", name: "port" },
            { label: "Database Name", name: "database" },
            { label: "Username", name: "user" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type = "text" }, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-0"
            >
              <label
                htmlFor={name}
                className="w-full sm:w-40 font-medium text-gray-800 text-base"
              >
                {label}:
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
