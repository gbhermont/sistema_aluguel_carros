import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import { formatarData } from '../../services/format.js'
import { listarMeusPedidos } from '../../services/pedidoService.js'

// UC06 / US10 — Consultar status dos pedidos.
export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarMeusPedidos().then(setPedidos).catch((e) => setErro(e.message))
  }, [])

  return (
    <section>
      <div className="page-header">
        <h1>Meus pedidos</h1>
        <Link to="/cliente/pedidos/novo" className="btn btn-primary">+ Novo pedido</Link>
      </div>

      {erro && <p className="error" role="alert">{erro}</p>}
      {!pedidos && !erro && <p className="loading">Carregando...</p>}

      {pedidos && (
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
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{formatarData(p.dataCriacao)}</td>
                  <td>{p.automovel.marca} {p.automovel.modelo} <small className="muted">({p.automovel.placa})</small></td>
                  <td><StatusBadge status={p.status} /></td>
                  <td><Link to={`/cliente/pedidos/${p.id}`}>Detalhes</Link></td>
                </tr>
              ))}
              {pedidos.length === 0 && (
                <tr><td colSpan="5" className="muted center">Você ainda não tem pedidos.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
