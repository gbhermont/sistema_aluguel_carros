import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

// UC02 / US02 — Fazer Login
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loginEmail, setLoginEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      await login({ login: loginEmail, senha })
      navigate('/')
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={entrar} noValidate>
        <h1>🚗 Aluguel de Carros</h1>
        <p className="muted">Acesse com seu usuário e senha.</p>

        <label htmlFor="email">Usuário (e-mail)</label>
        <input id="email" type="email" autoComplete="username" required
          value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />

        <label htmlFor="senha">Senha</label>
        <input id="senha" type="password" autoComplete="current-password" required
          value={senha} onChange={(e) => setSenha(e.target.value)} />

        {erro && <p className="error" role="alert">{erro}</p>}

        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
        <p className="muted center">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  )
}
