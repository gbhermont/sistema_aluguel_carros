import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import { formatarData } from '../../services/format.js'
import {
  consultarPedidoAgente, executarContrato, iniciarAnalise, registrarParecer,
} from '../../services/pedidoService.js'

// UC09, UC10, UC14 / US13, US14 — Análise financeira, parecer e execução do contrato.
export default function AvaliarPedido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pedido, setPedido] = useState(null)
  const [parecer, setParecer] = useState('')
  const [erro, setErro] = useState('')
  const [acao, setAcao] = useState(false)

  function carregar() {
    return consultarPedidoAgente(id).then(setPedido).catch((e) => setErro(e.message))
  }

  useEffect(() => {
    carregar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function executar(fn) {
    setErro('')
    setAcao(true)
    try {
      const atualizado = await fn()
      setPedido(atualizado)
    } catch (err) {
      setErro(err.message)
    } finally {
      setAcao(false)
    }
  }

  if (erro && !pedido) {
    return <p className="error" role="alert">{erro} <Link to="/agente/pedidos">Voltar</Link></p>
  }
  if (!pedido) return <p className="loading">Carregando...</p>

  const auto = pedido.automovel
  const { status } = pedido

  return (
    <section>
      <div className="page-header">
        <h1>Avaliar pedido #{pedido.id}</h1>
        <StatusBadge status={status} />
      </div>

      {erro && <p className="error" role="alert">{erro}</p>}

      <div className="card">
        <h2>Dados do pedido</h2>
        <dl className="details">
          <dt>Cliente</dt><dd>{pedido.clienteNome}</dd>
          <dt>Automóvel</dt><dd>{auto.marca} {auto.modelo} ({auto.ano})</dd>
          <dt>Placa / Matrícula</dt><dd>{auto.placa} / {auto.matricula}</dd>
          <dt>Criado em</dt><dd>{formatarData(pedido.dataCriacao)}</dd>
          <dt>Parecer</dt><dd>{pedido.parecer || <span className="muted">—</span>}</dd>
        </dl>
      </div>

      {status === 'PENDENTE' && (
        <div className="card">
          <h2>Análise financeira</h2>
          <p className="muted">Iniciar a análise muda o status para Em análise.</p>
          <button type="button" className="btn btn-primary" disabled={acao}
            onClick={() => executar(() => iniciarAnalise(id))}>Iniciar análise</button>
        </div>
      )}

      {status === 'EM_ANALISE' && (
        <form className="card" onSubmit={(e) => { e.preventDefault() }}>
          <h2>Emitir parecer</h2>
          <label htmlFor="parecer">Parecer</label>
          <textarea id="parecer" rows="3" value={parecer} onChange={(e) => setParecer(e.target.value)} required />
          <div className="actions">
            <button type="button" className="btn btn-danger" disabled={acao}
              onClick={() => executar(() => registrarParecer(id, false, parecer))}>Reprovar</button>
            <button type="button" className="btn btn-primary" disabled={acao}
              onClick={() => executar(() => registrarParecer(id, true, parecer))}>Aprovar</button>
          </div>
        </form>
      )}

      {status === 'APROVADO' && (
        <div className="card">
          <h2>Executar contrato</h2>
          <p className="muted">Concretiza o aluguel e muda o status para Executado.</p>
          <button type="button" className="btn btn-primary" disabled={acao}
            onClick={() => executar(() => executarContrato(id))}>Executar contrato</button>
        </div>
      )}

      {(status === 'EXECUTADO' || status === 'REPROVADO' || status === 'CANCELADO') && (
        <p className="muted">Pedido encerrado. Nenhuma ação disponível.</p>
      )}

      <div className="actions">
        <Link to="/agente/pedidos" className="btn btn-secondary">Voltar</Link>
      </div>
    </section>
  )
}
