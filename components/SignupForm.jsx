import { useState } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { Link } from "react-router";
import api from "../src/Constant.js";

export default function App() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await api.post("/otp/send-otp", { email: formData.email });
      if (res.data.success) {
        alert("OTP sent successfully to your email!");
        setOtpSent(true);
      }
    } catch (err) {
      console.error("Error sending OTP:", err.message);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await api.post("/otp/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      if (res.data.success) {
        alert("OTP verified successfully!");
        setOtpVerified(true);
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err.message);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit form (only if OTP is verified)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.userName) newErrors.userName = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!otpVerified) newErrors.otp = "Please verify your OTP first";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
        await api.post("/user/register", formData);
        alert("Account created successfully!");
      setFormData({ userName: "", email: "", password: "", confirmPassword: "", otp: "" });
      setOtpSent(false);
      setOtpVerified(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Error registering user:", err.message);
        // If backend reports duplicate (409), show server message
        const serverMsg = err.response?.data?.message;
        if (err.response?.status === 409 && serverMsg) {
          alert(serverMsg);
        } else {
          alert("Failed to create account. Please try again.");
        }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
        </div>

        {/* Email + Send OTP */}
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              disabled={!formData.email || !validateEmail(formData.email) || loading}
              onClick={handleSendOtp}
              className={`px-4 py-2 rounded text-white ${
                otpSent ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              } disabled:bg-gray-400`}
            >
              {loading ? "Sending..." : otpSent ? "Sent" : "Send OTP"}
            </button>
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-gray-600"
            >
              {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-2">Confirm Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2.5 text-gray-600"
            >
              {showConfirmPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* OTP Input + Verify Button */}
        <div className="mb-4">
          <label className="block mb-2">Enter OTP:</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
              disabled={!otpSent}
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={!otpSent || loading}
              className={`px-4 py-2 rounded text-white ${
                otpVerified ? "bg-green-500" : "bg-green-600 hover:bg-green-700"
              } disabled:bg-gray-400`}
            >
              {otpVerified ? "Verified" : loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
        </div>

        {/* Submit */}
        <button
          className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
          type="submit"
          disabled={!otpVerified}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
