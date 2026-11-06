import { Link } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import { formatarData, getAutomovel, pedidos } from '../../services/mockData.js'

// UC06 / US10 — Consultar status dos pedidos.
export default function MeusPedidos() {
  return (
    <section>
      <div className="page-header">
        <h1>Meus pedidos</h1>
        <Link to="/cliente/pedidos/novo" className="btn btn-primary">+ Novo pedido</Link>
      </div>

      <div className="card table-wrap">
        <table>
          <caption className="sr-only">Lista dos seus pedidos de aluguel</caption>
          <thead>
            <tr>
              <th scope="col">Nº</th>
              <th scope="col">Data</th>
              <th scope="col">Automóvel</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => {
              const auto = getAutomovel(p.automovelId)
              return (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{formatarData(p.dataCriacao)}</td>
                  <td>{auto.marca} {auto.modelo} <small className="muted">({auto.placa})</small></td>
                  <td><StatusBadge status={p.status} /></td>
                  <td><Link to={`/cliente/pedidos/${p.id}`}>Detalhes</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
