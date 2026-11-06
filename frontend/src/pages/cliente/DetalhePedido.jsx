import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import {
  automoveis, formatarData, getAutomovel, getPedido, podeCancelar, podeClienteModificar,
} from '../../services/mockData.js'

// UC06, UC07, UC08 / US10, US11, US12 — Ver, modificar e cancelar pedido.
export default function DetalhePedido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pedido = getPedido(id)

  if (!pedido) {
    return <p>Pedido não encontrado. <Link to="/cliente/pedidos">Voltar</Link></p>
  }

  const auto = getAutomovel(pedido.automovelId)
  const editavel = podeClienteModificar(pedido.status)
  const opcoes = automoveis.filter((a) => a.disponivel || a.id === pedido.automovelId)

  function salvar(e) {
    e.preventDefault()
    navigate('/cliente/pedidos')
  }

  function cancelar() {
    if (window.confirm(`Cancelar o pedido #${pedido.id}?`)) navigate('/cliente/pedidos')
  }

  return (
    <section>
      <div className="page-header">
        <h1>Pedido #{pedido.id}</h1>
        <StatusBadge status={pedido.status} />
      </div>

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
          <select id="automovel" defaultValue={pedido.automovelId}>
            {opcoes.map((a) => (
              <option key={a.id} value={a.id}>{a.marca} {a.modelo} · {a.placa}</option>
            ))}
          </select>
          <div className="actions">
            <button type="submit" className="btn btn-primary">Salvar alterações</button>
          </div>
        </form>
      ) : (
        <p className="muted">Este pedido não pode mais ser modificado (apenas Pendente ou Em análise).</p>
      )}

      <div className="actions">
        <Link to="/cliente/pedidos" className="btn btn-secondary">Voltar</Link>
        {podeCancelar(pedido.status) && (
          <button type="button" className="btn btn-danger" onClick={cancelar}>Cancelar pedido</button>
        )}
      </div>
    </section>
  )
}
