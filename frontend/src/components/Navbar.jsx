import { useNavigate } from 'react-router-dom'

export default function Navbar({ currentUser, setIsLoggedIn, setCurrentUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    setIsLoggedIn(false)
    navigate('/')
    setCurrentUser({})
  }

  return (
    <header className="flex items-center justify-between bg-white shadow px-10 py-4">
      <span className="text-xl font-semibold text-blue-600"></span>

      <div className="flex items-center gap-4">
        <div className="text-md text-gray-700">
          <p className="font-medium">{currentUser?.name || 'Guest'}</p>
          <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
