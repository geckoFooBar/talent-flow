import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import {
  Users,
  Clock,
  BarChart2,
  Settings,
  FileText,
  Award,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import { employees } from '../data/employees';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";



export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentOrg, currentUser, logout } = useAuth()
  const orgId = currentOrg?.orgId || "orgId";
  const orgSlug =
    currentOrg?.orgName?.toLowerCase().replace(/\s+/g, "-") || "org-name";

  const basePath = `/org/${orgId}/${orgSlug}`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/admin");
    }
  }, [navigate]);

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: <Users className="text-blue-600" />, color: 'from-blue-100 to-blue-50' },
    { label: 'Attendance Rate', value: '94%', icon: <Clock className="text-green-600" />, color: 'from-green-100 to-green-50' },
    { label: 'Performance Score', value: '88%', icon: <BarChart2 className="text-orange-500" />, color: 'from-orange-100 to-orange-50' },
    { label: 'Active Projects', value: '12', icon: <TrendingUp className="text-purple-600" />, color: 'from-purple-100 to-purple-50' },
  ]

  const quickActions = [
    { title: 'Manage Employees', icon: <Users size={20} />, color: 'blue', route: 'directory' },
    { title: 'View Attendance', icon: <Clock size={20} />, color: 'green', route: 'attendance' },
    { title: 'Performance Reports', icon: <BarChart2 size={20} />, color: 'orange', route: 'performance' },
    { title: 'Payroll & Finance', icon: <FileText size={20} />, color: 'indigo', route: 'payroll' },
    { title: 'Organization Settings', icon: <Settings size={20} />, color: 'purple', route: 'dashboard' },
    { title: 'Calendar', icon: <Calendar size={20} />, color: 'teal', route: 'dashboard' },
  ]

  const recentActivity = [
    { title: 'John Mark added a new project “AI HR Bot”', time: '2 hrs ago' },
    { title: 'Attendance synced successfully for March', time: '5 hrs ago' },
    { title: 'Performance reports exported by HR', time: 'Yesterday' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 overflow-x-hidden">
      {/* Welcome */}
      <div className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-800"
        >
          Welcome back, {currentUser?.name?.split(' ')[0] || 'Admin'} 👋
        </motion.h1>
        <p className="text-gray-600 mt-2">
          You’re managing <span className="font-semibold">{currentOrg?.orgName}</span>{' '}
          — here’s what’s happening today.
        </p>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {stats.map((item, i) => (
          <motion.div
            whileHover={{ scale: 1.03 }}
            key={i}
            className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-sm p-6 flex justify-between items-center transition`}
          >
            <div>
              <h3 className="text-sm text-gray-500">{item.label}</h3>
              <p className="text-3xl font-bold text-slate-800">{item.value}</p>
            </div>
            <div className="p-3 bg-white rounded-full shadow-inner">{item.icon}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((act, i) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  key={i}
                  onClick={() => navigate(`${basePath}/${act.route}`)}
                  className={`flex flex-col items-center justify-center text-center bg-${act.color}-50 border border-${act.color}-100 hover:bg-${act.color}-100 hover:border-${act.color}-200 transition rounded-xl p-6`}
                >
                  <div className={`p-3 bg-${act.color}-200 text-${act.color}-700 rounded-full mb-3`}>
                    {act.icon}
                  </div>
                  <p className="font-medium text-slate-700">{act.title}</p>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
            <div className="bg-white shadow-sm rounded-2xl p-6 divide-y divide-gray-100">
              {recentActivity.map((item, i) => (
                <div key={i} className="py-3">
                  <p className="text-slate-700 text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Section */}
        <aside className="space-y-8">
          {/* Organization Snapshot */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Organization Snapshot</h2>
            <ul className="text-sm space-y-2 text-slate-700">
              <li><strong>Name:</strong> {currentOrg?.orgName}</li>
              <li><strong>Industry:</strong> {currentOrg?.industry}</li>
              <li><strong>Size:</strong> {currentOrg?.size}</li>
              <li><strong>Country:</strong> {currentOrg?.country}</li>
            </ul>
          </section>

          {/* Employee of the Month */}
          <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow p-6 text-center">
            <div className="flex justify-center mb-3">
              <Award size={40} className="text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Employee of the Month</h3>
            <p className="text-gray-600">👩‍💻 Sarah Johnson (Marketing)</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
