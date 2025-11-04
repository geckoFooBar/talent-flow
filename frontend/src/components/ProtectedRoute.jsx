import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, isLoggedIn, currentUser, allowedRoles }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
