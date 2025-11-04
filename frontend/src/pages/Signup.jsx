import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_URL;

const allCountries = [
  "Afghanistan",
  "Argentina",
  "Australia",
  "Bangladesh",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "Egypt",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Ireland",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Philippines",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "UAE",
  "UK",
  "USA",
  "Vietnam",
];

export default function Signup() {
  const [formData, setFormData] = useState({
    orgName: "",
    industry: "",
    size: "",
    country: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const suggestionRef = useRef(null);

  useEffect(() => {
    const filtered = allCountries.filter((c) =>
      c.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountrySelect = (country) => {
    setFormData({ ...formData, country });
    setSearchTerm(country);
    setShowSuggestions(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && filteredCountries[highlightIndex]) {
        handleCountrySelect(filteredCountries[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.adminPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/org/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem(
          "currentOrg",
          JSON.stringify({
            orgId: data.orgId,
            orgSlug: data.orgSlug,
            orgName: formData.orgName,
          })
        );
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: formData.adminName,
            email: formData.adminEmail,
            role: "admin",
          })
        );
        setTimeout(() => navigate("/admin/login"), 1500);
        toast.success("Organization Registered Successfully");
      } else {
        toast.error("Failed to register organization");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
      alert("Server error. Please ensure backend is running.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            Register Your Organization
          </h1>
          <p className="text-gray-600 mt-2">
            Create your company account to start managing employees
            effortlessly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Organization Details
            </h2>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              placeholder="TalentFlow Pvt. Ltd."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Industry</option>
              <option value="IT">IT & Software</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Organization Size
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Size</option>
              <option value="1-20">1–20 employees</option>
              <option value="21-50">21–50 employees</option>
              <option value="51-200">51–200 employees</option>
              <option value="201-500">201–500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>

          <div className="relative" ref={suggestionRef}>
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Start typing a country..."
              value={searchTerm || formData.country}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFormData({ ...formData, country: e.target.value });
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {showSuggestions && filteredCountries.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                {filteredCountries.map((country, index) => (
                  <li
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className={`px-3 py-2 cursor-pointer ${
                      highlightIndex === index
                        ? "bg-blue-100"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-2 mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Admin Account
            </h2>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Admin Full Name
            </label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="e.g. Rohan Mudholkar"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              name="adminEmail"
              value={formData.adminEmail}
              onChange={handleChange}
              placeholder="admin@company.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              name="adminPassword"
              value={formData.adminPassword}
              onChange={(e) => {
                handleChange(e);
                if (confirmPassword && e.target.value !== confirmPassword) {
                  setPasswordError("Passwords do not match");
                } else {
                  setPasswordError("");
                }
              }}
              placeholder="Enter a secure password"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="col-span-2 relative">
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (formData.adminPassword !== e.target.value) {
                  setPasswordError("Passwords do not match");
                } else {
                  setPasswordError("");
                }
              }}
              placeholder="Re-enter password"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              required
            />
            {formData.adminPassword &&
              confirmPassword &&
              formData.adminPassword === confirmPassword &&
              !passwordError && (
                <FaCheckCircle className="text-green-500 absolute right-3 top-9 text-lg" />
              )}
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div className="col-span-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating Account..." : "Create Organization Account"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already registered?{" "}
          <button
            onClick={() => navigate("/login/admin")}
            className="text-blue-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
