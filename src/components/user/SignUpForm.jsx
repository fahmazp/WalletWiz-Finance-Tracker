import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export function SignupForm({ className, ...props }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      setErrors({ email: "Email is already registered." });
      return;
    }

    const newUser = {
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMessage("Account created successfully! Redirecting to login...");
    toast.success("Signup successful! Redirecting to login...");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center py-10">
        <h1 className="text-2xl font-bold ">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Start managing your finances with WalletWiz
        </p>
      </div>

      <div className="grid gap-5">
        {successMessage && (
          <div className="bg-green-500/10 border border-green-400/40 text-green-300 rounded-md p-3 text-center">
            {successMessage}
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className="border-2 border-green-200"
            id="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="text-red-400 text-sm flex items-center gap-1 mt-1">
              <AlertCircle size={14} /> {errors.email}
            </div>
          )}
        </div>

        <div className="grid gap-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            className="border-2 border-green-200"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-[34px] text-foreground hover:text-black"
          >
            {showPassword ? <EyeOff  size={14} /> : <Eye size={14} />}
          </button>          
          {errors.password && (
            <div className="text-red-400 text-sm flex items-center gap-1 mt-1">
              <AlertCircle size={14} /> {errors.password}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="underline underline-offset-4 text-primary"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
