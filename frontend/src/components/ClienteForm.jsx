import { useState } from 'react'

const MAX_RENDIMENTOS = 3

// Formulário de dados do contratante (US05 / US07).
// Reutilizado no cadastro e na edição de "Meus dados".
export default function ClienteForm({ inicial, comCredenciais = false, textoBotao, onSubmit, children }) {
  const [rendimentos, setRendimentos] = useState(
    inicial?.rendimentos?.length ? inicial.rendimentos : [{ id: 1, entidadeEmpregadora: '', valor: '' }],
  )

  function adicionarRendimento() {
    if (rendimentos.length >= MAX_RENDIMENTOS) return
    setRendimentos([...rendimentos, { id: Date.now(), entidadeEmpregadora: '', valor: '' }])
  }

  function removerRendimento(id) {
    setRendimentos(rendimentos.filter((r) => r.id !== id))
  }

  function enviar(e) {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form onSubmit={enviar}>
      {comCredenciais && (
        <fieldset>
          <legend>Acesso</legend>
          <div className="grid-2">
            <div>
              <label htmlFor="login">Usuário (e-mail)</label>
              <input id="login" type="email" autoComplete="username" required />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input id="senha" type="password" autoComplete="new-password" required />
            </div>
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend>Identificação</legend>
        <label htmlFor="nome">Nome completo</label>
        <input id="nome" required defaultValue={inicial?.nome} />
        <div className="grid-2">
          <div>
            <label htmlFor="rg">RG</label>
            <input id="rg" required defaultValue={inicial?.rg} />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" required inputMode="numeric" placeholder="000.000.000-00" defaultValue={inicial?.cpf} />
          </div>
        </div>
        <label htmlFor="endereco">Endereço</label>
        <input id="endereco" required defaultValue={inicial?.endereco} />
        <label htmlFor="profissao">Profissão</label>
        <input id="profissao" required defaultValue={inicial?.profissao} />
      </fieldset>

      <fieldset>
        <legend>Rendimentos (máximo {MAX_RENDIMENTOS})</legend>
        {rendimentos.map((r, i) => (
          <div className="grid-rend" key={r.id}>
            <div>
              <label htmlFor={`ent-${r.id}`}>Entidade empregadora {i + 1}</label>
              <input id={`ent-${r.id}`} defaultValue={r.entidadeEmpregadora} />
            </div>
            <div>
              <label htmlFor={`val-${r.id}`}>Rendimento (R$)</label>
              <input id={`val-${r.id}`} type="number" min="0" step="0.01" defaultValue={r.valor} />
            </div>
            <button type="button" className="btn btn-link danger" onClick={() => removerRendimento(r.id)}
              aria-label={`Remover rendimento ${i + 1}`}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={adicionarRendimento}
          disabled={rendimentos.length >= MAX_RENDIMENTOS}>
          + Adicionar rendimento
        </button>
      </fieldset>

      <div className="actions">
        {children}
        <button type="submit" className="btn btn-primary">{textoBotao}</button>
      </div>
    </form>
  )
}
