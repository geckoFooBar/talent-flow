// src/pages/LoginAdmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner"

const API_BASE = import.meta.env.VITE_API_URL;

export default function LoginAdmin() {
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

      if (res.ok) {
        // Save JWT token + user/org info
        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem(
          "currentOrg",
          JSON.stringify({
            orgId: data.user.orgId,
            orgName: data.user.orgName,
          })
        );
        localStorage.setItem("isLoggedIn", "true"); // ✅ Add this line
        
        console.log("Login successful!");

        // Generate slug from org name
        const orgSlug = data.user.orgName.toLowerCase().replace(/\s+/g, "-");
        navigate(`/org/${data.user.orgId}/${orgSlug}/dashboard`);
      } else {
        console.log("Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      alert("Server error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to manage your organization.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
