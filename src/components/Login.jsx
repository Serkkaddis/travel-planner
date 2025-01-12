import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig"; 
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      
      await login(email, password);
      
      navigate("/home"); 
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-textColor to-secondarybackground text-white">
      <div className="bg-primary p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-textColor rounded text-white font-semibold hover:bg-yellow-600 transition"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
