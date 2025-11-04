// src/App.jsx
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

// 🧩 Pages
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import LoginAdmin from "./pages/LoginAdmin";
import LoginManager from "./pages/LoginManager";
import LoginHR from "./pages/LoginHR";
import LoginEmployee from "./pages/LoginEmployee";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";
import PerformancePage from "./pages/PerformancePage";
import EmployeePage from "./pages/DirectoryPage";
import ReportsPage from "./pages/ReportsPage";
import DocumentsPage from "./pages/DocumentsPage";
import ProfilePage from "./pages/ProfilePage" 
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>     
  );
}

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  const [currentOrg, setCurrentOrg] = useState(
    JSON.parse(localStorage.getItem("currentOrg") || "null")
  );

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    const org = JSON.parse(localStorage.getItem("currentOrg") || "null");

    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
    setCurrentOrg(org);
  }, [location.pathname]);

  // 🚫 Prevent redirect loops to /signup
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const publicRoutes = [
      "/",
      "/signup",
      "/login/admin",
      "/login/manager",
      "/login/hr",
      "/login/employee",
    ];

    if (!user && !publicRoutes.some((r) => location.pathname.startsWith(r))) {
      navigate("/signup");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar shows only when logged in */}
      {isLoggedIn && currentOrg && <Sidebar />}

      {/* Page content */}
      <div className="flex-1">
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/login/manager" element={<LoginManager />} />
          <Route path="/login/hr" element={<LoginHR />} />
          <Route path="/login/employee" element={<LoginEmployee />} />

          {/* 🔒 Protected Routes (role-based via backend user.role) */}
          <Route
            path="/org/:orgId/:orgSlug/dashboard"
            element={<ProtectedRoute element={<DashboardPage />} />}
          />
          <Route
            path="/org/:orgId/:orgSlug/profile"
            element={<ProtectedRoute element={<ProfilePage currentUser={currentUser} />} />}
          />
          <Route
            path="/org/:orgId/:orgSlug/attendance"
            element={<ProtectedRoute element={<AttendancePage />} />}
          />
          <Route
            path="/org/:orgId/:orgSlug/performance"
            element={<ProtectedRoute element={<PerformancePage />} />}
          />
          <Route
            path="/org/:orgId/:orgSlug/employees"
            element={<ProtectedRoute element={<EmployeePage />} />}
          />
          <Route
            path="/org/:orgId/:orgSlug/reports"
            element={<ProtectedRoute element={<ReportsPage />} />}
          />
          <Route
            path="/org/:orgId/:orgSlug/documents"
            element={<ProtectedRoute element={<DocumentsPage />} />}
          />
        </Routes>
      </div>
    </div>
  );
}
