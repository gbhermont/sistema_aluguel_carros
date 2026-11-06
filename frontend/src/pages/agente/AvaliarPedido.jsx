import { Link, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import {
  cliente, formatarData, formatarMoeda, getAutomovel, getPedido,
} from '../../services/mockData.js'

// UC09, UC10, UC11, UC14 / US13, US14, US15, US18 — Análise financeira, parecer,
// execução do contrato e (se banco) concessão de crédito.
export default function AvaliarPedido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const pedido = getPedido(id)

  if (!pedido) {
    return <p>Pedido não encontrado. <Link to="/agente/pedidos">Voltar</Link></p>
  }

  const auto = getAutomovel(pedido.automovelId)
  const rendaTotal = cliente.rendimentos.reduce((s, r) => s + r.valor, 0)
  const isBanco = usuario.tipoAgente === 'BANCO'
  const voltar = () => navigate('/agente/pedidos')
  const { status } = pedido

  return (
    <section>
      <div className="page-header">
        <h1>Avaliar pedido #{pedido.id}</h1>
        <StatusBadge status={status} />
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Contratante</h2>
          <dl className="details">
            <dt>Nome</dt><dd>{cliente.nome}</dd>
            <dt>CPF</dt><dd>{cliente.cpf}</dd>
            <dt>RG</dt><dd>{cliente.rg}</dd>
            <dt>Profissão</dt><dd>{cliente.profissao}</dd>
            <dt>Endereço</dt><dd>{cliente.endereco}</dd>
          </dl>
          <h3>Rendimentos</h3>
          <ul className="plain">
            {cliente.rendimentos.map((r) => (
              <li key={r.id}>{r.entidadeEmpregadora}: {formatarMoeda(r.valor)}</li>
            ))}
          </ul>
          <p><strong>Renda total:</strong> {formatarMoeda(rendaTotal)}</p>
        </div>

        <div className="card">
          <h2>Pedido</h2>
          <dl className="details">
            <dt>Automóvel</dt><dd>{auto.marca} {auto.modelo} ({auto.ano})</dd>
            <dt>Placa / Matrícula</dt><dd>{auto.placa} / {auto.matricula}</dd>
            <dt>Criado em</dt><dd>{formatarData(pedido.dataCriacao)}</dd>
            <dt>Parecer</dt><dd>{pedido.parecer || <span className="muted">—</span>}</dd>
          </dl>
        </div>
      </div>

      {status === 'PENDENTE' && (
        <div className="card">
          <h2>Análise financeira</h2>
          <p className="muted">Iniciar a análise muda o status para Em análise.</p>
          <button type="button" className="btn btn-primary" onClick={voltar}>Iniciar análise</button>
        </div>
      )}

      {status === 'EM_ANALISE' && (
        <form className="card" onSubmit={(e) => { e.preventDefault(); voltar() }}>
          <h2>Emitir parecer</h2>
          <label htmlFor="parecer">Parecer</label>
          <textarea id="parecer" rows="3" required />
          <div className="actions">
            <button type="submit" className="btn btn-danger" name="decisao" value="REPROVADO">Reprovar</button>
            <button type="submit" className="btn btn-primary" name="decisao" value="APROVADO">Aprovar</button>
          </div>
        </form>
      )}

      {status === 'APROVADO' && (
        <form className="card" onSubmit={(e) => { e.preventDefault(); voltar() }}>
          <h2>Executar contrato</h2>
          <div className="grid-2">
            <div>
              <label htmlFor="propriedade">Propriedade do automóvel</label>
              <select id="propriedade" required defaultValue="EMPRESA">
                <option value="CLIENTE">Cliente</option>
                <option value="EMPRESA">Empresa</option>
                <option value="BANCO">Banco</option>
              </select>
            </div>
            <div>
              <label htmlFor="valorTotal">Valor total (R$)</label>
              <input id="valorTotal" type="number" min="0" step="0.01" required />
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="btn btn-primary">Executar contrato</button>
          </div>
        </form>
      )}

      {isBanco && (status === 'EM_ANALISE' || status === 'APROVADO') && (
        <form className="card" onSubmit={(e) => { e.preventDefault(); voltar() }}>
          <h2>Conceder contrato de crédito</h2>
          <div className="grid-3">
            <div>
              <label htmlFor="valorFin">Valor financiado (R$)</label>
              <input id="valorFin" type="number" min="0" step="0.01" required />
            </div>
            <div>
              <label htmlFor="parcelas">Parcelas</label>
              <input id="parcelas" type="number" min="1" required />
            </div>
            <div>
              <label htmlFor="juros">Taxa de juros (% a.m.)</label>
              <input id="juros" type="number" min="0" step="0.01" required />
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="btn btn-primary">Conceder crédito</button>
          </div>
        </form>
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
