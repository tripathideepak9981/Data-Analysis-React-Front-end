import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
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

    if (fullName.trim() === "") return setError("Full name cannot be empty");
    if (email.trim() === "") return setError("Email cannot be empty");
    if (password.trim() === "") return setError("Password cannot be empty");
    if (password.length < 8)
      return setError("Password must be at least 8 characters long");
    if (password !== confirmPassword) return setError("Passwords do not match");

    const formData = {
      username: fullName,
      email: email,
      password: password,
    };

    setLoading(true);

    try {
      const response = await sendSignUpData(formData);
      console.log("Signup successful:", response);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-3"
      style={{ background: "#e8efff" }}
    >
      <div className="w-full max-w-md bg-gray-50 p-5  rounded-[30px] shadow-[0_0_40px_rgba(0,0,0,0.2)]">
        <div className="text-center mt-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Sign up</h2>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-5 px-2">
          <div>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full py-2 pl-5 pr-4 bg-gray-100  border-b-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#845fd9]"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 pl-5 pr-4 bg-gray-100 border-b-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#845fd9]"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 pl-5 pr-12 bg-gray-100 border-b-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#845fd9]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-2 pl-5 pr-12 bg-gray-100 border-b-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#845fd9]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="terms"
              required
              className="form-checkbox text-blue-600"
            />
            <label htmlFor="terms">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 flex justify-center items-center space-x-2 ${
              loading
                ? "bg-[#845fd9] cursor-not-allowed"
                : "bg-[#503888] text-white"
            }`}
          >
            {loading ? (
              <>
                <Spinner />
                <span className="text-white font-medium">Signing Up...</span>
              </>
            ) : (
              <>
                <User className="w-5 h-5" />
                <span>Sign Up</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/SignInPage"
            className="font-semibold hover:underline"
            style={{ color: "#2563eb" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
