import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation as location,
  useNavigate,
} from "react-router-dom";

import { attendance } from "./data/attendance";
import { employees as initialEmployees } from "./data/employees";
import { leaveRequests as initialLeaveRequests } from "./data/leaveRequests";
import { candidates as initialCandidates } from "./data/candidates";
import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import LoginAdmin from "./pages/LoginAdmin";
import LoginHR from "./pages/LoginHR";
import LoginManager from "./pages/LoginManager";
import LoginEmployee from "./pages/LoginEmployee";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import DirectoryPage from "./pages/DirectoryPage";
import LeavePage from "./pages/LeavePage";
import RecruitmentPage from "./pages/RecruitmentPage";
import AttendancePage from "./pages/AttendancePage";
import PerformancePage from "./pages/PerformancePage";
import PayrollPage from "./pages/PayrollPage";
import DocumentsPage from "./pages/DocumentsPage";
import ReportsPage from "./pages/ReportsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";

export default function App() {
  const navigate = useNavigate();
  //const { isLoggedIn, currentOrg } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "{}")
  );
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [employees] = useState(initialEmployees);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [candidates, setCandidates] = useState(initialCandidates);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location.pathname]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const path = location.pathname;

    // ✅ Only redirect if user is missing AND you’re not on public routes
    const publicRoutes = [
      "/",
      "/signup",
      "/login/admin",
      "/login/hr",
      "/login/manager",
      "/login/employee",
    ];

    {
      /*// Prevent redirect if already navigating to an org or login/signup
    if (!user && !publicRoutes.some((r) => path.startsWith(r))) {
      navigate("/signup");
    }*/
    }
  }, [navigate, location.pathname]);

  const onUpdateLeave = (id, status) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const onApplyLeave = (form) => {
    setLeaveRequests((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        employeeId: currentUser.id,
        ...form,
        status: "Pending",
      },
    ]);
  };

  const onAddCandidate = (form) => {
    setCandidates((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...form,
        avatar: "https://placehold.co/100x100/cccccc/333333?text=New",
      },
    ]);
  };

  localStorage.setItem("users", JSON.stringify(employees));

  return (
    <div
      className="flex h-screen bg-slate-100"
      style={{ fontFamily: "Jost, Nunito Sans", fontSize: 18 }}
    >
      {/* ✅ Sidebar visible only when logged in */}
      {isLoggedIn && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/*<header className="bg-white shadow-sm flex items-center justify-between p-4 md:justify-end">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-slate-500"
          >
            {isSidebarOpen ? icons.close : icons.menu}
          </button>
          <div className="flex items-center">
            <span className="text-right mr-4">
              <span className="font-semibold text-slate-800">
                {currentUser.name}
              </span>
              <span className="block text-sm text-slate-500">
                {currentUser.position}
              </span>
            </span>
            <img
              className="w-10 h-10 rounded-full"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
          </div>
        </header>
         */}
        {/* Main Content */}
        {isLoggedIn && (
          <Navbar
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        )}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/login" element={<LoginAdmin />} />
              <Route path="/hr/login" element={<LoginHR />} />/
              <Route path="/manager/login" element={<LoginManager />} />
              <Route path="/employee/login" element={<LoginEmployee />} />

              <Route
                path="/org/:orgId/:orgSlug/dashboard"
                element={<DashboardPage />}
              />
              <Route
                path="/org/:orgId/:orgSlug/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "employee", "manager", "hr"]}
                  >
                    <ProfilePage currentUser={currentUser} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/directory"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "hr", "manager"]}
                  >
                    <DirectoryPage employees={employees} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/leave"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "hr", "manager", "employee"]}
                  >
                    <LeavePage
                      leaveRequests={leaveRequests}
                      employees={employees}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/attendance"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "hr", "manager", "employee"]}
                  >
                    <AttendancePage
                      attendance={attendance}
                      employees={employees}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/performance"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "manager"]}
                  >
                    <PerformancePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/payroll"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "manager", "hr"]}
                  >
                    <PayrollPage title="Payroll" />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/documents"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "employee"]}
                  >
                    <DocumentsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/recruitment"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "hr"]}
                  >
                    <RecruitmentPage candidates={candidates} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/org/:orgId/:orgSlug/reports"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    allowedRoles={["admin", "hr", "manager"]}
                  >
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/signup" element={<Signup />} />
              <Route
                path="*"
                element={
                  <Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />
                }
              />
            </Routes>
        </main>
      </div>
    </div>
  );
}
