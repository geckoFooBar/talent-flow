// src/pages/LoginHR.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

export default function LoginHR() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem(
          "currentOrg",
          JSON.stringify({
            orgId: data.user.orgId,
            orgName: data.user.orgName,
          })
        );
        localStorage.setItem("isLoggedIn", "true");

        alert("✅ HR login successful!");

        const orgSlug = data.user.orgName.toLowerCase().replace(/\s+/g, "-");
        navigate(`/org/${data.user.orgId}/${orgSlug}/dashboard`);
      } else {
        alert(data.message || "Invalid HR credentials");
      }
    } catch (error) {
      setLoading(false);
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
          HR Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to manage employees, attendance, and reports.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="HR Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "Login as HR"}
          </button>
        </form>
      </div>
    </div>
  );
}
