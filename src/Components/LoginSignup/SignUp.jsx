import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track if submit clicked

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const fullNameRegex = /^[A-Za-z\s]+$/; // Allow letters and spaces
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,15}$/;

  const MAX_NAME_EMAIL_LENGTH = 45;
  const MAX_PASSWORD_LENGTH = 15;

  const validateFields = () => {
    const validationErrors = {};

    // Full Name Validation
    if (!fullName.trim()) {
      validationErrors.fullName = "Full name is required";
    } else if (fullName.trim().length > MAX_NAME_EMAIL_LENGTH) {
      validationErrors.fullName = `Full name must not exceed ${MAX_NAME_EMAIL_LENGTH} characters`;
    } else if (!fullNameRegex.test(fullName.trim())) {
      validationErrors.fullName = "Name must only contain letters and spaces";
    } else if (/^\d+$/.test(fullName.trim())) {
      validationErrors.fullName = "Name cannot be only numbers";
    }

    // Email Validation
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (email.trim().length > MAX_NAME_EMAIL_LENGTH) {
      validationErrors.email = `Email must not exceed ${MAX_NAME_EMAIL_LENGTH} characters`;
    } else if (!emailRegex.test(email.trim())) {
      validationErrors.email = "Enter a valid email address";
    }

    // Password Validation
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length > MAX_PASSWORD_LENGTH) {
      validationErrors.password = `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`;
    } else if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Password must have 8-15 chars, upper, lower, number, special char";
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const formData = {
      username: fullName.replace(/\s+/g, ""), // Remove spaces
      email: email.trim(),
      password,
    };

    setLoading(true);

    try {
      await sendSignUpData(formData);
      navigate("/");
    } catch (err) {
      console.error("Error here : ", err);
      if (err.error_type === "USERNAME_EXISTS") {
        setErrors({ fullName: "Username already exists. Try another." });
      } else if (err.error_type === "EMAIL_EXISTS") {
        setErrors({ email: err.message });
      } else {
        setErrors({
          global: err.message || "Something went wrong. Try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-2 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-xl backdrop-blur-lg bg-white/90 border border-white/20 shadow-2xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Get Started
            </h1>
            <p className="text-gray-600 mt-1">
              Create your account to unlock AI-powered insights
            </p>
          </div>

          {errors.global && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center border border-red-300 shadow">
              {errors.global}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value.slice(0, MAX_NAME_EMAIL_LENGTH))
                  } // Limit input length
                  disabled={loading}
                  maxLength={MAX_NAME_EMAIL_LENGTH}
                  className="pl-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
              </div>
              {submitted && errors.fullName && (
                <p className="text-red-500 text-xs">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value.trimStart().slice(0, MAX_NAME_EMAIL_LENGTH)
                    )
                  } // Limit input length
                  disabled={loading}
                  maxLength={MAX_NAME_EMAIL_LENGTH}
                  className="pl-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
              </div>
              {submitted && errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value.slice(0, MAX_PASSWORD_LENGTH))
                  } // Limit input length
                  disabled={loading}
                  maxLength={MAX_PASSWORD_LENGTH}
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
              {submitted && errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  maxLength={MAX_PASSWORD_LENGTH}
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
              {submitted && errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
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
