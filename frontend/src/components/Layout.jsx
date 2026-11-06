import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Layout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/login')
  }

  const isCliente = usuario.perfil === 'CLIENTE'

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">🚗 Aluguel de Carros</span>
        <nav aria-label="Navegação principal">
          {isCliente ? (
            <>
              <NavLink to="/cliente/pedidos">Meus pedidos</NavLink>
              <NavLink to="/cliente/pedidos/novo">Novo pedido</NavLink>
              <NavLink to="/cliente/dados">Meus dados</NavLink>
            </>
          ) : (
            <NavLink to="/agente/pedidos">Pedidos para avaliar</NavLink>
          )}
        </nav>
        <div className="user">
          <span>
            {usuario.nome}
            <small> ({isCliente ? 'Cliente' : `Agente ${usuario.tipo === 'BANCO' ? 'Banco' : 'Empresa'}`})</small>
          </span>
          <button type="button" className="btn btn-link" onClick={sair}>Sair</button>
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
