import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import { STATUS_LABEL, formatarData, getAutomovel, pedidos } from '../../services/mockData.js'

// UC09 / US13 — Lista de pedidos para o agente avaliar.
export default function PedidosAgente() {
  const [filtro, setFiltro] = useState('TODOS')
  const lista = filtro === 'TODOS' ? pedidos : pedidos.filter((p) => p.status === filtro)

  return (
    <section>
      <div className="page-header">
        <h1>Pedidos para avaliar</h1>
        <div>
          <label htmlFor="filtro" className="inline-label">Status</label>
          <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="TODOS">Todos</option>
            {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="card table-wrap">
        <table>
          <caption className="sr-only">Pedidos de aluguel recebidos</caption>
          <thead>
            <tr>
              <th scope="col">Nº</th>
              <th scope="col">Cliente</th>
              <th scope="col">Automóvel</th>
              <th scope="col">Data</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => {
              const auto = getAutomovel(p.automovelId)
              return (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.clienteNome}</td>
                  <td>{auto.marca} {auto.modelo}</td>
                  <td>{formatarData(p.dataCriacao)}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td><Link to={`/agente/pedidos/${p.id}`}>Avaliar</Link></td>
                </tr>
              )
            })}
            {lista.length === 0 && (
              <tr><td colSpan="6" className="muted center">Nenhum pedido com este status.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
