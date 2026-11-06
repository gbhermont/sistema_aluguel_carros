import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { automoveis } from '../../services/mockData.js'

// UC05 + UC13 / US09, US17 — Escolher automóvel disponível e criar pedido (nasce PENDENTE).
export default function NovoPedido() {
  const navigate = useNavigate()
  const [selecionado, setSelecionado] = useState(null)
  const disponiveis = automoveis.filter((a) => a.disponivel)

  function criar(e) {
    e.preventDefault()
    if (!selecionado) return
    navigate('/cliente/pedidos')
  }

  return (
    <section>
      <h1>Novo pedido de aluguel</h1>
      <form onSubmit={criar}>
        <fieldset className="card">
          <legend>Escolha um automóvel disponível</legend>
          <div className="cars">
            {disponiveis.map((a) => (
              <label key={a.id} className={`car ${selecionado === a.id ? 'selected' : ''}`}>
                <input type="radio" name="automovel" value={a.id}
                  checked={selecionado === a.id} onChange={() => setSelecionado(a.id)} />
                <strong>{a.marca} {a.modelo}</strong>
                <span>Ano {a.ano}</span>
                <span className="muted">Placa {a.placa} · Matrícula {a.matricula}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <p className="muted">
          O pedido será criado com status <strong>Pendente</strong> e enviado para análise financeira de um agente.
        </p>

        <div className="actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={!selecionado}>Criar pedido</button>
        </div>
      </form>
    </section>
  )
}
