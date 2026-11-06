import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import MeusPedidos from './pages/cliente/MeusPedidos.jsx'
import NovoPedido from './pages/cliente/NovoPedido.jsx'
import DetalhePedido from './pages/cliente/DetalhePedido.jsx'
import MeusDados from './pages/cliente/MeusDados.jsx'
import PedidosAgente from './pages/agente/PedidosAgente.jsx'
import AvaliarPedido from './pages/agente/AvaliarPedido.jsx'

function Home() {
  const { usuario, carregando } = useAuth()
  if (carregando) return <p className="loading">Carregando...</p>
  if (!usuario) return <Navigate to="/login" replace />
  return <Navigate to={usuario.perfil === 'CLIENTE' ? '/cliente/pedidos' : '/agente/pedidos'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<ProtectedRoute perfil="CLIENTE" />}>
        <Route element={<Layout />}>
          <Route path="/cliente/pedidos" element={<MeusPedidos />} />
          <Route path="/cliente/pedidos/novo" element={<NovoPedido />} />
          <Route path="/cliente/pedidos/:id" element={<DetalhePedido />} />
          <Route path="/cliente/dados" element={<MeusDados />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute perfil="AGENTE" />}>
        <Route element={<Layout />}>
          <Route path="/agente/pedidos" element={<PedidosAgente />} />
          <Route path="/agente/pedidos/:id" element={<AvaliarPedido />} />
        </Route>
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
