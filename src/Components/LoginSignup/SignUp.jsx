import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import signupImg from "../../assets/signupp.avif";
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
      console.log("Signup successful:", response);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 flex flex-col items-center justify-center">
      <div className="flex flex-1 items-center justify-center w-full">
        <div
          className="relative flex flex-col max-h-[100vh] min-h-[80vh] md:flex-row items-stretch w-full max-w-4xl 
        rounded-3xl border border-gray-300/60 shadow-2xl 
        bg-white/90 backdrop-blur-md
        animate-fade-in  transition-transform duration-200"
          style={{
            boxShadow:
              "0 6px 40px 0 rgba(52,36,100,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.11)",
            background:
              "rgba(252,253,255,0.93) linear-gradient(110deg,#eef1fc 0%,#e5e2fa 100%)",
          }}
        >
          {/* Left Side */}
          <div className="hidden md:flex md:w-1/2 flex-col  items-center px-2 bg-white rounded-l-3xl">
            <img
              src={signupImg}
              alt="Sign Up Illustration"
              className="mb-2 h-[400px] object-contain select-none"
              draggable="false"
            />
            <h2 className="text-2xl font-bold text-indigo-700 mb-1 font-sans tracking-tight">
              Create Your Account
            </h2>
            <p className="text-xs mt-2 text-gray-500">— Modern AI bot</p>
            <div className="mt-2 text-center text-sm text-gray-700 font-medium">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/SignInPage")}
                className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Right Side (Form) */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 px-7 py-4 md:py-8 flex flex-col justify-center gap-2 bg-white/80 rounded-r-3xl"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-1 font-sans">
              Get started for free
            </h1>
            <p className="text-sm text-gray-600 mb-3 font-medium">
              Sign up to create your account
            </p>

            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center border border-red-300 mb-3 animate-fade-in shadow">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="relative mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  className="block w-full rounded-xl px-8 py-1.5 bg-gray-100 focus:bg-white text-gray-900 
                  placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 
                  focus:ring-indigo-400 transition text-base"
                />
                <User
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="block w-full rounded-xl px-4 py-1.5 pl-9 pr-10 bg-gray-100 focus:bg-white text-gray-900
                  placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 
                  focus:ring-indigo-400 transition text-base"
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

            {/* Confirm Password */}
            <div className="relative mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="block w-full rounded-xl px-4 py-1.5 pl-9 pr-10 bg-gray-100 focus:bg-white text-gray-900
                  placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 
                  focus:ring-indigo-400 transition text-base"
                />
                <Lock
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2 mt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="form-checkbox rounded text-indigo-600 focus:ring-indigo-400 h-3 w-3"
              />
              <label htmlFor="terms" className="select-none">
                I agree to the{" "}
                <span className="underline text-indigo-600 hover:text-indigo-900 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline text-indigo-600 hover:text-indigo-900 cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit */}
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
                  <span className="ml-2">Signing Up...</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
