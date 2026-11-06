import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import { formatarData, podeCancelar, podeClienteModificar } from '../../services/format.js'
import {
  cancelarPedido, consultarMeuPedido, listarAutomoveisDisponiveis, modificarPedido,
} from '../../services/pedidoService.js'

// UC06, UC07, UC08 / US10, US11, US12 — Ver, modificar e cancelar pedido.
export default function DetalhePedido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pedido, setPedido] = useState(null)
  const [disponiveis, setDisponiveis] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [erro, setErro] = useState('')
  const [acao, setAcao] = useState(false)

  useEffect(() => {
    consultarMeuPedido(id)
      .then((p) => {
        setPedido(p)
        setSelecionado(p.automovel.id)
      })
      .catch((e) => setErro(e.message))
  }, [id])

  // Carrega automóveis disponíveis só quando o pedido é editável.
  useEffect(() => {
    if (pedido && podeClienteModificar(pedido.status)) {
      listarAutomoveisDisponiveis().then(setDisponiveis).catch(() => setDisponiveis([]))
    }
  }, [pedido])

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setAcao(true)
    try {
      await modificarPedido(id, selecionado)
      navigate('/cliente/pedidos')
    } catch (err) {
      setErro(err.message)
      setAcao(false)
    }
  }

  async function cancelar() {
    if (!window.confirm(`Cancelar o pedido #${pedido.id}?`)) return
    setErro('')
    setAcao(true)
    try {
      await cancelarPedido(id)
      navigate('/cliente/pedidos')
    } catch (err) {
      setErro(err.message)
      setAcao(false)
    }
  }

  if (erro && !pedido) {
    return <p className="error" role="alert">{erro} <Link to="/cliente/pedidos">Voltar</Link></p>
  }
  if (!pedido) return <p className="loading">Carregando...</p>

  const auto = pedido.automovel
  const editavel = podeClienteModificar(pedido.status)
  // Garante que o automóvel atual apareça na lista mesmo se já não estiver "disponível".
  const opcoes = disponiveis.some((a) => a.id === auto.id) ? disponiveis : [auto, ...disponiveis]

  return (
    <section>
      <div className="page-header">
        <h1>Pedido #{pedido.id}</h1>
        <StatusBadge status={pedido.status} />
      </div>

      {erro && <p className="error" role="alert">{erro}</p>}

      <div className="card">
        <dl className="details">
          <dt>Criado em</dt><dd>{formatarData(pedido.dataCriacao)}</dd>
          <dt>Atualizado em</dt><dd>{formatarData(pedido.dataAtualizacao)}</dd>
          <dt>Automóvel</dt><dd>{auto.marca} {auto.modelo} ({auto.ano}) · {auto.placa}</dd>
          <dt>Parecer do agente</dt><dd>{pedido.parecer || <span className="muted">Ainda sem parecer</span>}</dd>
        </dl>
      </div>

      {editavel ? (
        <form className="card" onSubmit={salvar}>
          <h2>Modificar pedido</h2>
          <label htmlFor="automovel">Automóvel</label>
          <select id="automovel" value={selecionado ?? ''} onChange={(e) => setSelecionado(Number(e.target.value))}>
            {opcoes.map((a) => (
              <option key={a.id} value={a.id}>{a.marca} {a.modelo} · {a.placa}</option>
            ))}
          </select>
          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={acao}>Salvar alterações</button>
          </div>
        </form>
      ) : (
        <p className="muted">Este pedido não pode mais ser modificado (apenas Pendente ou Em análise).</p>
      )}

      <div className="actions">
        <Link to="/cliente/pedidos" className="btn btn-secondary">Voltar</Link>
        {podeCancelar(pedido.status) && (
          <button type="button" className="btn btn-danger" onClick={cancelar} disabled={acao}>Cancelar pedido</button>
        )}
      </div>
    </section>
  )
}
