import { useState } from "react";
import { useNavigate } from "../hooks/router-compat";
import { motion } from "motion/react";
import { UserIcon, LockIcon, UserIconLarge } from "./auth/AuthIcons";
import { Mail } from "lucide-react";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

function InputField({ label, type, placeholder, icon, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-[#d3dbde] text-xl md:text-2xl font-bold mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3 bg-[#0f1319] border border-[#d9d9d9] rounded-lg px-4 py-3 md:py-4 focus-within:border-[#5281e0] transition-colors">
        <div className="w-6 h-6 md:w-8 md:h-8 shrink-0">{icon}</div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-lg md:text-xl focus:outline-none placeholder-[#98aab3]"
        />
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          password,
          ...(isLogin ? {} : { email: email.trim() })
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      localStorage.setItem("userId", data.id);
      localStorage.setItem("username", data.username);
      navigate("/dashboard");
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1319] flex items-center justify-center px-4 py-8 font-['Inter',sans-serif]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#171c26] rounded-3xl p-8 md:p-12 lg:p-16 w-full max-w-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <UserIconLarge />
          </div>
        </div>

        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          Welcome to Smart City Explorer
        </h1>

        <div className="bg-[#1f2533] rounded-xl p-1 mb-8 grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`py-3 md:py-4 px-6 rounded-lg text-xl md:text-2xl font-bold transition-colors ${
              isLogin
                ? "bg-[#0f1319] text-[#d3dbde]"
                : "bg-transparent text-[#d3dbde] hover:bg-[#0f1319]/50"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`py-3 md:py-4 px-6 rounded-lg text-xl md:text-2xl font-bold transition-colors ${
              !isLogin
                ? "bg-[#0f1319] text-[#d3dbde]"
                : "bg-transparent text-[#d3dbde] hover:bg-[#0f1319]/50"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            placeholder="Enter your username..."
            icon={<UserIcon />}
            value={username}
            onChange={setUsername}
          />

          {!isLogin && (
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email..."
              icon={<Mail className="w-full h-full text-[#98aab3]" />}
              value={email}
              onChange={setEmail}
            />
          )}

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password..."
            icon={<LockIcon />}
            value={password}
            onChange={setPassword}
          />

          {!isLogin && (
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Reenter your password..."
              icon={<LockIcon />}
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5281e0] hover:bg-[#4170cf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[#0f1319] py-4 md:py-5 rounded-lg text-2xl md:text-3xl font-bold mt-8"
          >
            {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Register"}
          </button>

          {isLogin && (
            <p className="text-center text-[#98aab3] text-sm mt-4">
              Forgot your password?{" "}
              <button
                type="button"
                className="text-[#5281e0] hover:underline"
              >
                Reset it here
              </button>
            </p>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2e3a]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#171c26] px-4 text-[#98aab3] text-sm">
                or
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-[#1f2533] hover:bg-[#2a2e3a] transition-colors text-white py-4 rounded-lg text-lg font-medium flex items-center justify-center gap-3 border border-[#2a2e3a]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </form>
      </motion.div>
    </div>
  );
}
