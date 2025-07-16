import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { STRINGS } from "../../constant/strings";

export default function AuthPage() {
  const { signup, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, username);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
          {isLogin ? STRINGS.AUTH.LOGIN : STRINGS.AUTH.SIGNUP}
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder={STRINGS.PLACEHOLDERS.USERNAME}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          )}
          <input
            type="email"
            placeholder={STRINGS.PLACEHOLDERS.EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
          <input
            type="password"
            placeholder={STRINGS.PLACEHOLDERS.PASSWORD}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            {isLogin
              ? STRINGS.AUTH.SWITCH_TO_SIGNUP
              : STRINGS.AUTH.SWITCH_TO_LOGIN}
          </button>
        </form>
        <p className="text-sm text-center mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-purple-600 ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? STRINGS.AUTH.SIGNUP : STRINGS.AUTH.LOGIN}
          </button>
        </p>
      </div>
    </div>
  );
}
