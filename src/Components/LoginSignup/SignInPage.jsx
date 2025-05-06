import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { sendSignInData } from "../../Api";
import gmail from "../../assets/icons/gmail.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Spinner = () => (
    <svg
      viewBox="25 25 50 50"
      className="w-5 h-5 animate-rotate4 origin-center text-white"
    >
      <circle
        cx="50"
        cy="50"
        r="20"
        className="fill-none stroke-current stroke-2 stroke-linecap-round animate-dash4 text-white"
      />
    </svg>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "") {
      setError("Email cannot be empty");
      return;
    }

    if (password.trim() === "") {
      setError("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await sendSignInData(email, password);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#e8efff" }}
    >
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] h-[450px] bg-white py-10 px-5  rounded-[30px] shadow-[0_0_40px_rgba(0,0,0,0.2)] flex flex-col space-y-8 items-center"
        >
          <p className="text-3xl font-bold text-gray-700  my-3 mt-5">
            Welcome to Login
          </p>

          {/* Email */}
          <div className="relative w-full">
            <img
              src={gmail}
              alt="icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-700"
            />

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2 text-sm text-gray-800 border-b-2 border-gray-300 rounded-full focus:outline-none focus:border-[#845fd9]"
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700"
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-9 pr-10 py-2 text-sm text-gray-800 border-b-2 border-gray-300 rounded-full focus:outline-none focus:border-[#845fd9]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 ${
              loading
                ? "bg-[#845fd9] cursor-not-allowed"
                : "bg-[#503888] text-white"
            }`}
          >
            {loading ? (
              <>
                <Spinner />
                <span className="text-white font-medium">Signing In...</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Forgot / Create */}
          <div className="py-5 flex justify-center text-base font-semibold text-gray-800 w-full">
            <button type="button" className="">
              Don't have any Account ?
              <span
                onClick={() => navigate("/SignUp")}
                className="pl-1 text-blue-700 underline hover:text-blue-600 transition text-base font-normal"
              >
                Create one
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
