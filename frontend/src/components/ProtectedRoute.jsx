import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

// Bloqueia telas internas sem login e restringe por perfil (US02 / US04).
export default function ProtectedRoute({ perfil }) {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/login" replace />
  if (perfil && usuario.perfil !== perfil) return <Navigate to="/" replace />
  return <Outlet />
}
