import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { sendSignInData } from "../../Api";
import login from "../../assets/loginn.avif"; // ← Your image

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const Spinner = () => (
    <svg viewBox="25 25 50 50" className="w-5 h-5 animate-spin text-white">
      <circle
        cx="50"
        cy="50"
        r="20"
        className="fill-none stroke-current stroke-2 stroke-linecap-round"
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
      if (!response.error) {
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      } else {
        setLoading(false);
        setError("Login failed.");
      }
    } catch (err) {
      setError(
        err === "Network Error"
          ? "Network Error"
          : "Incorrect Email Or Password"
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 flex items-center justify-center font-sans px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl shadow-xl rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-200 animate-fade-in">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 px-6 py-6 rounded-l-3xl">
          <img
            src={login}
            alt="Login Illustration"
            className="h-[300px] object-contain mb-2 select-none"
            draggable="false"
          />
          <h2 className="text-2xl font-bold text-indigo-700 mb-1">
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-600 text-center max-w-xs">
            “This portal makes managing my data Analysis effortless. Love it!”
          </p>
          <p className="text-xs mt-2 text-gray-500">— Modern AI bot</p>
        </div>
        {/* Right Panel - Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 px-7 py-4 md:py-8 flex flex-col justify-center gap-2 bg-white/80 rounded-r-3xl"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-1 font-sans">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-600 mb-3 font-medium">
            Enter your credentials below
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center border border-red-300 mb-3 animate-fade-in shadow">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="relative mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="block w-full rounded-xl px-4 py-1.5 pl-9 bg-gray-100 focus:bg-white text-gray-900 
        placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 
        focus:ring-indigo-400 transition text-base"
                autoComplete="email"
              />
              <Mail
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="block w-full rounded-xl px-4 py-1.5 pl-9 pr-10 bg-gray-100 focus:bg-white text-gray-900
        placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 
        focus:ring-indigo-400 transition text-base"
                autoComplete="current-password"
              />
              <Lock
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-2 mt-2 font-semibold flex items-center justify-center gap-2
      bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500 text-white focus:ring-2 focus:ring-indigo-500 shadow-lg
      transition-all duration-200 hover:scale-[1.03] active:scale-100 disabled:opacity-80 disabled:cursor-not-allowed text-base"
          >
            {loading ? (
              <>
                <Spinner />
                <span className="ml-2">Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Redirect to Sign Up */}
          <div className="mt-4 text-center text-sm text-gray-700 font-medium">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/SignUp")}
              className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
              disabled={loading}
            >
              Create one
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
