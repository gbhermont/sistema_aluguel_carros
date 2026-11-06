import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService.js'
import { getToken } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  // Restaura a sessão a partir do token salvo (ao recarregar a página).
  useEffect(() => {
    if (!getToken()) {
      setCarregando(false)
      return
    }
    authService
      .carregarUsuarioAtual()
      .then(setUsuario)
      .catch(() => authService.logout())
      .finally(() => setCarregando(false))
  }, [])

  async function login(credenciais) {
    const u = await authService.login(credenciais)
    setUsuario(u)
    return u
  }

  function logout() {
    authService.logout()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
