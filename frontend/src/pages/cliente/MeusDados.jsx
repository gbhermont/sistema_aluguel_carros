import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClienteForm from '../../components/ClienteForm.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'
import {
  atualizarMeuCadastro, consultarMeuCadastro, removerMeuCadastro,
} from '../../services/clienteService.js'

// UC04 / US06, US07, US08 — Consultar, atualizar e remover o próprio cadastro.
export default function MeusDados() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    consultarMeuCadastro().then(setCliente).catch((e) => setErro(e.message))
  }, [])

  async function salvar(dados) {
    setMensagem('')
    const atualizado = await atualizarMeuCadastro(dados)
    setCliente(atualizado)
    setMensagem('Dados atualizados com sucesso.')
  }

  async function remover() {
    // US08: exige confirmação; o back-end bloqueia se houver pedidos ativos.
    if (!window.confirm('Deseja realmente remover seu cadastro? Esta ação não pode ser desfeita.')) return
    try {
      await removerMeuCadastro()
      logout()
      navigate('/login')
    } catch (e) {
      setErro(e.message)
    }
  }

  if (erro && !cliente) return <p className="error" role="alert">{erro}</p>
  if (!cliente) return <p className="loading">Carregando...</p>

  return (
    <section>
      <h1>Meus dados</h1>
      {mensagem && <p className="success" role="status">{mensagem}</p>}
      {erro && <p className="error" role="alert">{erro}</p>}
      <div className="card">
        <ClienteForm inicial={cliente} textoBotao="Salvar alterações" onSubmit={salvar}>
          <button type="button" className="btn btn-danger" onClick={remover}>Remover cadastro</button>
        </ClienteForm>
      </div>
    </section>
  )
}
