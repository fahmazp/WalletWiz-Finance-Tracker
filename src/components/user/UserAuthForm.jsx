import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const LoginForm = ({ onLogin, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = storedUsers.find(
    (user) =>
      user.email === formData.email && user.password === formData.password
  );

  if (!foundUser) {
    setErrors({
      general: "Invalid email or password. Please try again.",
    });

    toast.error("Login failed! Invalid credentials.")
    return;
  }
  setErrors({});

    if (formData.rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("userEmail", formData.email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("userEmail");
    }

    const userData = {
      email: foundUser.email,
      name: foundUser.name || "New User",
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("currentUser", JSON.stringify(userData));

    if (onLogin) onLogin(userData);

    toast.success("Login success! Welcome back user.")
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 text-sm bg-white/5 border border-white/50 rounded-xl py-4 px-3 md:p-6 shadow-lg"
    >
      {errors.general && (
        <div className="flex items-start gap-2 p-3 border border-red-500/40 bg-red-500/10 rounded-md">
          <AlertCircle className="text-red-500 mt-0.5" size={18} />
          <div>
            <p className="text-red-400 font-semibold">Authentication Failed</p>
            <p className="text-red-300">{errors.general}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-white font-medium" htmlFor="email">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-white/10 border-white/20 focus:ring-2 focus:ring-purple-400 text-white"
          autoComplete="email"
        />
        {errors.email && <p className="text-red-300">{errors.email}</p>}
      </div>

      <div className="space-y-2 relative">
        <label className="text-white font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          className="bg-white/20 border-white/20 focus:ring-2 focus:ring-purple-400 text-white pr-10"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-8 text-green-300"
        >
          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
        {errors.password && <p className="text-red-300">{errors.password}</p>}
      </div>

      <div className="flex justify-between items-center text-white/80">
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, rememberMe: checked }))
            }
          />
          <label htmlFor="rememberMe" className="cursor-pointer">
            Remember Me
          </label>
        </div>
        <button
          type="button"
          className="hidden md:block text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        Sign In
      </Button>

      <div className="text-center text-white/80 border-t border-white/10 pt-4">
        <p>Don't have an account?</p>
        <Button
          type="button"
          variant="outline"
          className="w-full mt-2 bg-foreground border-white/10 text-white hover:bg-secondary"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
