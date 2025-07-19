import { useState, useEffect } from "react";
import { Eye, EyeOff, Database, X } from "lucide-react";
import Swal from "sweetalert2";
import { connectToDatabase } from "../../../Api";

const PopupForm = ({ dbType, isOpen, onClose, setDbResponse }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    db_type: dbType || "postgresql",
    host: "",
    port: dbType === "mongodb" ? "27017" : dbType === "mysql" ? "3306" : "5432",
    database: "",
    user: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("DbResponse"));
    if (saved && saved.type === dbType && saved.credentials) {
      setFormData({ ...formData, ...saved.credentials });
    }
  }, [dbType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsConnecting(true);
      const response = await connectToDatabase(formData);
      if (response.error) {
        Swal.fire({
          icon: "error",
          title: "Could not connect to database",
          text: "Something went wrong",
          confirmButtonText: "OK",
        });
      } else if (response.status === "connected") {
        const updatedResponse = {
          ...response,
          type: formData.db_type,
          credentials: formData,
        };
        setDbResponse(updatedResponse);
        localStorage.setItem("dbType", formData.db_type);
        localStorage.setItem("DbResponse", JSON.stringify(updatedResponse));

        Swal.fire({
          icon: "success",
          title: "Database Connected!",
          text: "Connection established successfully",
          confirmButtonText: "OK",
        });
        onClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl px-8 py-6 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">
            Create Database Connection
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your database connection details to establish a secure
            connection.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* DB Type */}
          <div className="space-y-1">
            <label
              htmlFor="db_type"
              className="text-sm font-medium text-gray-700"
            >
              Database Type
            </label>
            <select
              id="db_type"
              name="db_type"
              value={formData.db_type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>

          {/* Host & Port */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="host"
                className="text-sm font-medium text-gray-700"
              >
                Host
              </label>
              <input
                type="text"
                id="host"
                name="host"
                value={formData.host}
                onChange={handleChange}
                placeholder="localhost"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="port"
                className="text-sm font-medium text-gray-700"
              >
                Port
              </label>
              <input
                type="number"
                id="port"
                name="port"
                value={formData.port}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Database Name */}
          <div className="space-y-1">
            <label
              htmlFor="database"
              className="text-sm font-medium text-gray-700"
            >
              Database Name
            </label>
            <input
              type="text"
              id="database"
              name="database"
              value={formData.database}
              onChange={handleChange}
              placeholder="my_database"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* User & Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="user"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="user"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Enter Username"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="space-y-1 relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
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
                required
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[38px] right-3 text-gray-500 hover:text-indigo-600 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isConnecting}
              className={`w-full py-2 rounded-xl text-white text-base sm:text-lg font-semibold transition-all duration-300 transform flex items-center justify-center gap-2 ${
                isConnecting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 shadow-md"
              }`}
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Connecting...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  Connect to Database
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
