import { useState } from 'react'

const MAX_RENDIMENTOS = 3

function rendimentosIniciais(inicial) {
  if (inicial?.rendimentos?.length) {
    return inicial.rendimentos.map((r, i) => ({
      key: r.id ?? i,
      entidadeEmpregadora: r.entidadeEmpregadora ?? '',
      valor: r.valor ?? '',
    }))
  }
  return [{ key: 1, entidadeEmpregadora: '', valor: '' }]
}

/**
 * Formulário de dados do contratante (US05 / US07), controlado.
 * Chama onSubmit(dados) com o payload pronto para a API.
 */
export default function ClienteForm({ inicial, comCredenciais = false, textoBotao, onSubmit, children }) {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState(inicial?.nome ?? '')
  const [rg, setRg] = useState(inicial?.rg ?? '')
  const [cpf, setCpf] = useState(inicial?.cpf ?? '')
  const [endereco, setEndereco] = useState(inicial?.endereco ?? '')
  const [profissao, setProfissao] = useState(inicial?.profissao ?? '')
  const [rendimentos, setRendimentos] = useState(() => rendimentosIniciais(inicial))
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  function adicionarRendimento() {
    if (rendimentos.length >= MAX_RENDIMENTOS) return
    setRendimentos([...rendimentos, { key: Date.now(), entidadeEmpregadora: '', valor: '' }])
  }

  function removerRendimento(key) {
    setRendimentos(rendimentos.filter((r) => r.key !== key))
  }

  function atualizarRendimento(key, campo, valor) {
    setRendimentos(rendimentos.map((r) => (r.key === key ? { ...r, [campo]: valor } : r)))
  }

  function montarPayload() {
    const rends = rendimentos
      .filter((r) => r.entidadeEmpregadora.trim() !== '')
      .map((r) => ({ entidadeEmpregadora: r.entidadeEmpregadora.trim(), valor: Number(r.valor) || 0 }))
    const base = { nome, endereco, profissao, rendimentos: rends }
    return comCredenciais ? { ...base, login, senha, rg, cpf } : base
  }

  async function enviar(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      await onSubmit?.(montarPayload())
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} noValidate>
      {comCredenciais && (
        <fieldset>
          <legend>Acesso</legend>
          <div className="grid-2">
            <div>
              <label htmlFor="login">Usuário (e-mail)</label>
              <input id="login" type="email" autoComplete="username" required
                value={login} onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input id="senha" type="password" autoComplete="new-password" required
                value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend>Identificação</legend>
        <label htmlFor="nome">Nome completo</label>
        <input id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
        <div className="grid-2">
          <div>
            <label htmlFor="rg">RG</label>
            <input id="rg" required value={rg} readOnly={!comCredenciais}
              onChange={(e) => setRg(e.target.value)} />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" required inputMode="numeric" placeholder="000.000.000-00"
              value={cpf} readOnly={!comCredenciais} onChange={(e) => setCpf(e.target.value)} />
          </div>
        </div>
        {!comCredenciais && <p className="muted small">CPF e RG não podem ser alterados.</p>}
        <label htmlFor="endereco">Endereço</label>
        <input id="endereco" required value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        <label htmlFor="profissao">Profissão</label>
        <input id="profissao" required value={profissao} onChange={(e) => setProfissao(e.target.value)} />
      </fieldset>

      <fieldset>
        <legend>Rendimentos (máximo {MAX_RENDIMENTOS})</legend>
        {rendimentos.map((r, i) => (
          <div className="grid-rend" key={r.key}>
            <div>
              <label htmlFor={`ent-${r.key}`}>Entidade empregadora {i + 1}</label>
              <input id={`ent-${r.key}`} value={r.entidadeEmpregadora}
                onChange={(e) => atualizarRendimento(r.key, 'entidadeEmpregadora', e.target.value)} />
            </div>
            <div>
              <label htmlFor={`val-${r.key}`}>Rendimento (R$)</label>
              <input id={`val-${r.key}`} type="number" min="0" step="0.01" value={r.valor}
                onChange={(e) => atualizarRendimento(r.key, 'valor', e.target.value)} />
            </div>
            <button type="button" className="btn btn-link danger" onClick={() => removerRendimento(r.key)}
              aria-label={`Remover rendimento ${i + 1}`}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={adicionarRendimento}
          disabled={rendimentos.length >= MAX_RENDIMENTOS}>
          + Adicionar rendimento
        </button>
      </fieldset>

      {erro && <p className="error" role="alert">{erro}</p>}

      <div className="actions">
        {children}
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Salvando...' : textoBotao}
        </button>
      </div>
    </form>
  )
}
