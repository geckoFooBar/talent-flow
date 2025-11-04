import { useNavigate } from "react-router-dom";
import ServicesPage from "./ServicesPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiLoader, FiCheckCircle } from "react-icons/fi";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleNavigate = (path, message = "Redirecting...") => {
    const id = toast.loading(
      <div className="flex items-center gap-2">
        <FiLoader className="animate-spin text-white" />
        <span>{message}</span>
      </div>,
      {
        position: "top-right",
        theme: "colored",
      }
    );

    setTimeout(() => {
      toast.update(id, {
        render: (
          <div className="flex items-center gap-2">
            <FiCheckCircle className="text-white" />
            <span>Redirecting now!</span>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      setTimeout(() => navigate(path), 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white select-none">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1
            className="text-2xl font-bold text-blue-600"
            style={{ fontFamily: "Nunito Sans" }}
          >
            talentFlow
          </h1>
          <div className="space-x-6 text-gray-700 font-medium">
            <button
              onClick={() => handleNavigate("/signup", "Preparing signup page…")}
              className="bg-white-600 text-blue-600 px-5 py-2 rounded-xl hover:bg-white transition"
            >
              Signup
            </button>
            <button
              onClick={() =>
                handleNavigate("/employee/login", "Opening login page…")
              }
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 pb-16 px-3">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight max-w-3xl">
          Simplify HR, Payroll & Employee Management with Ease
        </h1>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl">
          A next-generation HR software that streamlines attendance, payroll,
          and performance management — all in one intuitive platform.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigate("/signup", "Preparing signup page…")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
          <button
            onClick={() =>
              handleNavigate("/employee/login", "Opening login page…")
            }
            className="px-8 py-3 bg-transparent border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </button>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Everything You Need for a Smarter Workforce
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              iconColor="bg-blue-100 text-blue-600"
              title="Payroll Automation"
              desc="Handle payroll, compliance, and payments with one click. No errors, no delays."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            <FeatureCard
              iconColor="bg-green-100 text-green-600"
              title="Attendance & Leave"
              desc="Flexible leave policies, shift tracking, and automated attendance integration."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <FeatureCard
              iconColor="bg-purple-100 text-purple-600"
              title="Performance Reviews"
              desc="Set goals, track KPIs, and empower teams to perform at their best."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>
      <ServicesPage />
      <section id="roles" className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Login by Role
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                role: "Admin",
                color: "bg-blue-600",
                desc: "Full system access & management.",
                route: "/admin/login",
              },
              {
                role: "HR",
                color: "bg-green-600",
                desc: "Handle recruitment, leave, and employee data.",
                route: "/hr/login",
              },
              {
                role: "Manager",
                color: "bg-orange-500",
                desc: "Manage teams and review performance.",
                route: "/manager/login",
              },
              {
                role: "Employee",
                color: "bg-purple-600",
                desc: "View attendance, apply leaves, and manage profile.",
                route: "/employee/login",
              },
            ].map((r) => (
              <div
                key={r.role}
                className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {r.role}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{r.desc}</p>
                <button
                  onClick={() =>
                    handleNavigate(r.route, `Opening ${r.role} login page…`)
                  }
                  className={`${r.color} text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition`}
                >
                  Login as {r.role}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">talentFlow</h3>
            <p className="text-sm text-gray-400">
              Empowering organizations to manage people, payroll, and
              performance — seamlessly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white">
                  Roles
                </a>
              </li>
              <li>
                <a href="/employee/login" className="hover:text-white">
                  Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <span className="text-gray-400">support@talentFlow.com</span>
              </li>
              <li>
                Phone: <span className="text-gray-400">+91 xxxxx xxxxx</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} talentFlow. All Rights Reserved.
        </p>
      </footer>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc, iconColor }) {
  return (
    <div className="flex flex-col items-start p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
      <div
        className={`h-12 w-12 mb-4 ${iconColor} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
