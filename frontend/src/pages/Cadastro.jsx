import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClienteForm from '../components/ClienteForm.jsx'
import { cadastrarCliente } from '../services/authService.js'

// UC01 / US01 + US05 — Cadastro público (sempre cria perfil CLIENTE).
export default function Cadastro() {
  const navigate = useNavigate()
  const [sucesso, setSucesso] = useState(false)

  async function cadastrar(dados) {
    await cadastrarCliente(dados)
    setSucesso(true)
    setTimeout(() => navigate('/login'), 1200)
  }

  return (
    <div className="auth-page">
      <div className="card form-card">
        <h1>Criar conta de cliente</h1>
        <p className="muted">
          Agentes (empresas e bancos) são pré-cadastrados e não usam este formulário.
        </p>
        {sucesso && <p className="success" role="status">Cadastro realizado! Redirecionando para o login...</p>}
        <ClienteForm comCredenciais textoBotao="Cadastrar" onSubmit={cadastrar}>
          <Link to="/login" className="btn btn-secondary">Voltar</Link>
        </ClienteForm>
      </div>
    </div>
  )
}
