import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { sendSignUpData } from "../../Api";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (fullName.trim() === "") return setError("Full name cannot be empty");
    if (email.trim() === "") return setError("Email cannot be empty");
    if (password.trim() === "") return setError("Password cannot be empty");
    if (password.length < 8)
      return setError("Password must be at least 8 characters long");
    if (password !== confirmPassword) return setError("Passwords do not match");

    const formData = {
      username: fullName.replace(/\s+/g, ""),
      email: email,
      password: password,
    };

    setLoading(true);

    try {
      const response = await sendSignUpData(formData);
      if (!error) {
        navigate("/");
      }
    } catch (err) {
      setError("Network Error. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-2 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-70 bg-gradient-to-br from-violet-400/20 to-blue-400/20 rounded-full blur-3xl animate-float z-0" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-float z-0"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        {/* <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300 group-hover:scale-110">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-violet-600" />
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Data Whisperer
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            AI-Powered Data Analysis Platform
          </p>
        </div> */}

        {/* Auth Card */}
        <div className="rounded-xl backdrop-blur-lg bg-white/90 border border-white/20 shadow-2xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Get Started
            </h1>
            <p className="text-gray-600 mt-1">
              Create your account to unlock AI-powered insights
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center border border-red-300 animate-fade-in shadow">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  className="pl-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="pl-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-10 pr-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="pl-10 pr-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-2 font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white focus:ring-2 focus:ring-violet-500 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-100 disabled:opacity-80 text-base"
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Signing Up...</span>
                </>
              ) : (
                <>
                  <User size={18} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>

          {/* Already have account */}
          <p className="text-sm text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/SignInPage")}
              className="text-violet-600 hover:text-violet-800 underline font-medium"
              disabled={loading}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
