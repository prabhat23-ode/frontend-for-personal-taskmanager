import { useState } from "react";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import api, { setAuthToken } from "../src/Constant.js"
import { useNavigate } from "react-router";
import Toast from "./Toast.jsx";

export default function App() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    try {
      const res = await api.post("/user/login", formData);
      const { token, user } = res.data;
      // store token and user
      if (token) {
        setAuthToken(token);
      }
      try { localStorage.setItem("user", JSON.stringify(user)); } catch (e) {}

      // show small toast
      setToast({ visible: true, message: "Logged in successfully", type: "success" });

      // after short delay redirect to tasks
      setTimeout(() => {
        setToast({ visible: false, message: "", type: "success" });
        navigate("/tasks");
      }, 900);
    } catch (err) {
      console.error("Error registering user:", err.message);
      setToast({ visible: true, message: "Login failed: " + (err.response?.data?.message || err.message), type: "error" });
      setTimeout(() => setToast({ visible: false, message: "", type: "error" }), 1800);
    }
  };

  return (
    <div>
      <Toast
        message={toast.visible ? toast.message : ""}
        type={toast.type}
        onClose={() => setToast({ visible: false, message: "", type: toast.type })}
      />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email or Username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            autoComplete="username"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter email or username"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            autoComplete="current-password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9"
          >
            {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
