import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff, Mail, Lock, BarChart3 } from "lucide-react";
import { Button } from "../home/ui/Button";
import { Input } from "../home/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../home/ui/card";
import login from "../../assets/loginn.avif";
import { sendSignInData } from "../../Api";

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

    if (email.trim() === "") return setError("Email cannot be empty");
    if (password.trim() === "") return setError("Password cannot be empty");

    setLoading(true);
    try {
      const response = await sendSignInData(email, password);
      if (!response.error) {
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      } else {
        setError("Login failed.");
        setLoading(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 relative">
      {/* Background Glow Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-violet-400/20 to-blue-400/20 rounded-full blur-3xl animate-float z-0"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-float z-0"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <Card className="backdrop-blur-lg bg-white/90 border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to continue your data analysis journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error */}
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center border border-red-300 animate-fade-in shadow">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="pl-10 pr-10"
                    required
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
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 group"
              >
                <span className="flex items-center justify-center space-x-2">
                  {loading ? <Spinner /> : <LogIn size={20} />}
                  <span>{loading ? "Signing In..." : "Sign In"}</span>
                </span>
              </Button>
            </form>

            {/* Redirect */}
            <div className="text-center text-sm text-gray-700 font-medium">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/SignUp")}
                className="text-violet-600 hover:text-violet-800 underline font-semibold"
                disabled={loading}
              >
                Create one
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-violet-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-violet-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
