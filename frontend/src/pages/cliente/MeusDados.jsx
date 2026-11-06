import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClienteForm from '../../components/ClienteForm.jsx'
import { cliente } from '../../services/mockData.js'
import { useAuth } from '../../hooks/useAuth.jsx'

// UC04 / US06, US07, US08 — Consultar, atualizar e remover o próprio cadastro.
export default function MeusDados() {
  const [mensagem, setMensagem] = useState('')
  const { logout } = useAuth()
  const navigate = useNavigate()

  function remover() {
    // US08: exige confirmação; o back-end bloqueará se houver pedidos ativos.
    if (window.confirm('Deseja realmente remover seu cadastro? Esta ação não pode ser desfeita.')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <section>
      <h1>Meus dados</h1>
      {mensagem && <p className="success" role="status">{mensagem}</p>}
      <div className="card">
        <ClienteForm inicial={cliente} textoBotao="Salvar alterações"
          onSubmit={() => setMensagem('Dados atualizados (simulação).')}>
          <button type="button" className="btn btn-danger" onClick={remover}>Remover cadastro</button>
        </ClienteForm>
      </div>
    </section>
  )
}
