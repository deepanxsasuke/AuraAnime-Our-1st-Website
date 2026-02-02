import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white">
      <div className="bg-gray-900 p-6 rounded-lg w-[300px]">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black border border-gray-700"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-black p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
