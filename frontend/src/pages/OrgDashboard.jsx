import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Users, Clock, LineChart, Settings, LogOut } from 'lucide-react'

export default function OrgDashboard() {
  const { orgId } = useParams()
  const navigate = useNavigate()
  const [org, setOrg] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const orgs = JSON.parse(localStorage.getItem('organizations') || '[]')
    const found = orgs.find((o) => o.id === orgId)
    if (found) {
      setOrg(found)
      setAdmin(found.users[0])
    } else {
      navigate('/signup')
    }
  }, [orgId, navigate])

  const handleLogout = () => {
    localStorage.removeItem('currentOrg')
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  if (!org) return <div className="h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-semibold">{org.orgName} Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {admin?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-sm px-4 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Organization Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: <Users size={28} className="text-blue-600" />, label: 'Total Employees', value: 32 },
            { icon: <Clock size={28} className="text-green-600" />, label: 'Attendance Rate', value: '94%' },
            { icon: <LineChart size={28} className="text-orange-500" />, label: 'Active Projects', value: 5 },
            { icon: <Settings size={28} className="text-purple-600" />, label: 'Pending Tasks', value: 8 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-5 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <h3 className="text-gray-500 text-sm">{item.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              </div>
              {item.icon}
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: 'Manage Employees', route: '/directory', color: 'blue' },
            { title: 'View Attendance', route: '/attendance', color: 'green' },
            { title: 'Performance Reports', route: '/performance', color: 'orange' },
            { title: 'Payroll & Finance', route: '/payroll', color: 'purple' },
            { title: 'Documents', route: '/documents', color: 'teal' },
            { title: 'Settings', route: '/settings', color: 'gray' },
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.route)}
              className={`cursor-pointer bg-${card.color}-50 border border-${card.color}-200 hover:bg-${card.color}-100 transition rounded-xl p-6 shadow-sm`}
            >
              <h4 className={`text-lg font-semibold text-${card.color}-700 mb-1`}>
                {card.title}
              </h4>
              <p className="text-sm text-gray-600">Go to {card.title.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
