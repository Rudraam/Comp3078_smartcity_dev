import { useState } from "react";
import { useNavigate } from "../hooks/router-compat";
import { motion } from "motion/react";
import { UserIcon, LockIcon, UserIconLarge } from "./auth/AuthIcons";
import { Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

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
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(username.trim(), password);
      } else {
        await register(username.trim(), email.trim(), password);
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || (isLogin ? "Login failed" : "Registration failed"));
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

        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          Welcome to Smart City Explorer
        </h1>

        <p className="text-[#98aab3] text-center text-sm mb-8">
          {isLogin ? "Sign in to your account to continue" : "Create an account to get started — the first user becomes Admin"}
        </p>

        <div className="bg-[#1e2a38] rounded-xl p-1 mb-8 grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`py-3 md:py-4 px-6 rounded-lg text-xl md:text-2xl font-bold transition-colors ${
              isLogin
                ? "bg-[#0f1319] text-[#d3dbde]"
                : "bg-transparent text-[#d3dbde] hover:bg-white/10"
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
                : "bg-transparent text-[#d3dbde] hover:bg-white/10"
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
              placeholder="Enter your email (optional)..."
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
        </form>
      </motion.div>
    </div>
  );
}
