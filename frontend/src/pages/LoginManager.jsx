// src/pages/LoginManager.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

export default function LoginManager() {
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

        alert("✅ Manager login successful!");

        const orgSlug = data.user.orgName.toLowerCase().replace(/\s+/g, "-");
        navigate(`/org/${data.user.orgId}/${orgSlug}/dashboard`);
      } else {
        alert(data.message || "Invalid manager credentials");
      }
    } catch (error) {
      setLoading(false);
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 to-orange-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
          Manager Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to manage your team and performance.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Manager Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            {loading ? "Logging in..." : "Login as Manager"}
          </button>
        </form>
      </div>
    </div>
  );
}
