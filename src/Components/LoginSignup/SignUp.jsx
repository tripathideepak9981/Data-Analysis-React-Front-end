import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { sendSignUpData, sendOtp, verifyOtp } from "../../Api";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,15}$/;

  const validateField = (field, value) => {
    let error = "";

    if (field === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value.trim()))
        error = "Enter a valid email address";
      else if (value.trim().length > 30)
        error = "Email must not exceed 30 characters";
    }

    if (field === "phone") {
      if (!value.trim()) error = "Phone number is required";
      else if (!phoneRegex.test(value.trim()))
        error = "Phone number must be 10 digit";
    }

    if (field === "password") {
      if (!value) error = "Password is required";
      else if (!passwordRegex.test(value))
        error =
          "Password must have 8-15 chars, upper, lower, number, special char";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Realtime validation effect
  useEffect(() => {
    if (email) validateField("email", email);
  }, [email]);

  useEffect(() => {
    if (phone) validateField("phone", phone);
  }, [phone]);

  useEffect(() => {
    if (password) validateField("password", password);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateField("email", email);
    validateField("phone", phone);
    validateField("password", password);

    if (
      Object.values({
        email: errors.email,
        phone: errors.phone,
        password: errors.password,
      }).some((err) => err)
    )
      return;

    try {
      setLoading(true);

      await sendOtp({
        email: email.trim(),
        mobile_number: `${phone.trim()}`,
        password,
      });

      setOtpModalOpen(true);
    } catch (err) {
      setErrors({
        global: err.message || "Failed to send OTP. Please check your details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setOtpError("Enter the full 6-digit OTP.");
      return;
    }

    setOtpError("");
    setOtpLoading(true);

    try {
      await verifyOtp(enteredOtp);

      const formData = {
        email: email.trim(),
        phone: `${countryCode}${phone.trim()}`,
        password,
      };

      navigate("/");
    } catch (err) {
      setOtpError(err.message || "Invalid or expired OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (otpError) setOtpError("");

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const Spinner = () => <Loader2 className="animate-spin w-5 h-5 text-white" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-2">
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-xl backdrop-blur-lg bg-white/90 border border-white/20 shadow-2xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
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
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="pl-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  disabled={loading}
                  className="rounded-xl py-2 px-3 border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+49">🇩🇪 +49</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    disabled={loading}
                    className="pl-10 w-full rounded-xl py-2 border border-gray-300 bg-gray-50 focus:bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition text-sm"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
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
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-2 font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white focus:ring-2 focus:ring-violet-500 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-100 disabled:opacity-80 text-base"
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Sending OTP...</span>
                </>
              ) : (
                <>
                  <Mail size={18} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>

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

      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative bg-white rounded-xl shadow-lg px-10 py-6 text-center space-y-4">
            <button
              onClick={() => {
                setOtpModalOpen(false);
                setOtp(["", "", "", "", "", ""]);
                setOtpError("");
              }}
              className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
            >
              <ArrowLeft size={20} />
            </button>

            {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

            <h2 className="text-2xl font-bold text-blue-700">
              Verify Your Email
            </h2>
            <p className="text-sm text-gray-600">
              Enter the 6-digit OTP sent to
              <br />
              <span className="font-medium">{email}</span>
            </p>

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-10 h-10 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otpLoading}
              className="w-full rounded-xl py-2 font-semibold bg-gradient-to-r from-violet-600 to-blue-600 text-white focus:ring-2 focus:ring-violet-500 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-100 disabled:opacity-80"
            >
              <span className="flex items-center justify-center pl-4 gap-2">
                {otpLoading && <Spinner />}
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </span>
            </button>

            <p className="text-sm text-center text-gray-500 py-4">
              Didn’t receive the code?{" "}
              <button
                onClick={() => sendOtp(email.trim())}
                className="text-violet-600 font-medium hover:underline"
              >
                Resend Code
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
