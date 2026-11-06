import { Link, useNavigate } from 'react-router-dom'
import ClienteForm from '../components/ClienteForm.jsx'

// UC01 / US01 + US05 — Cadastro público (sempre cria perfil CLIENTE).
export default function Cadastro() {
  const navigate = useNavigate()

  return (
    <div className="auth-page">
      <div className="card form-card">
        <h1>Criar conta de cliente</h1>
        <p className="muted">
          Agentes (empresas e bancos) são pré-cadastrados e não usam este formulário.
        </p>
        <ClienteForm comCredenciais textoBotao="Cadastrar" onSubmit={() => navigate('/login')}>
          <Link to="/login" className="btn btn-secondary">Voltar</Link>
        </ClienteForm>
      </div>
    </div>
  )
}
