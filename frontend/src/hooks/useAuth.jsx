import { createContext, useContext, useState } from 'react'
import { usuarios } from '../services/mockData.js'

// Autenticação SIMULADA, apenas para navegar entre as telas estáticas.
// Será substituída pelo login real (Spring Security + JWT).
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  function login(email) {
    const encontrado = usuarios.find((u) => u.login === email.trim().toLowerCase())
    if (!encontrado) return false
    setUsuario(encontrado)
    return true
  }

  function logout() {
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
