import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Users,
  BarChart2,
  FileText,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChartNoAxesCombined,
  User2Icon,
  Briefcase,
  Folder,
  HandCoinsIcon,
  House,
  UserCheck2,
  AmbulanceIcon,
} from "lucide-react";

export default function Sidebar() {
  const { currentOrg, logout } = useAuth();

  // Extract orgId and slug for dynamic routing
  const orgId = currentOrg?.orgId || "orgId";
  const orgSlug =
    currentOrg?.orgName?.toLowerCase().replace(/\s+/g, "-") || "org-name";

  const basePath = `/org/${orgId}/${orgSlug}`;

  const navItems = [
    {
      name: "Dashboard",
      path: `${basePath}/dashboard`,
      icon: <Home size={20} />,
    },
    {
      name: "Profile",
      path: `${basePath}/profile`,
      icon: <User2Icon size={20} />,
    },
    { name: "Employees", path: `${basePath}/directory`, icon: <Users size={20} /> },
    { name: "Attendance", path: `${basePath}/attendance`, icon: <UserCheck2 size={20} /> },
    {
      name: "Performance",
      path: `${basePath}/performance`,
      icon: <ChartNoAxesCombined size={20} />,
    },
    { name: "Leave", path: `${basePath}/leave`, icon: <AmbulanceIcon size={20} /> },
    {
      name: "Recruitment",
      path: `${basePath}/recruitment`,
      icon: <Briefcase size={20} />,
    },
    { name: "Reports", path: `${basePath}/reports`, icon: <Folder size={20} /> },
    { name: "Payroll", path: `${basePath}/payroll`, icon: <HandCoinsIcon size={20} /> },
    { name: "Documents", path: `${basePath}/documents`, icon: <FileText size={20} /> },
  ];

  return (
    <aside
      className={`w-64 min-h-screen backdrop-blur-xl bg-white/70 border-r border-gray-200 text-gray-700 flex flex-col justify-between transition-all`}
    >
      <div>
        {/* Org Info */}
        <div className="p-5 text-center">
          <h2 className="text-3xl font-semibold">
            {currentOrg?.orgName || "Organization"}
          </h2>
          <p className="text-xs text-gray-500">
            {currentOrg?.industry || "EMS Portal"}
          </p>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-2 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-md font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                    : "hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
