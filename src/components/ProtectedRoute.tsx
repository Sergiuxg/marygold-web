import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: React.ReactNode
  allowedRoles?: string[]
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  const parsedUser = JSON.parse(user)

  if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute