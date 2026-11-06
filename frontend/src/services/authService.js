import { api, setToken } from './api.js'

export async function login(credenciais) {
  const resp = await api.post('/auth/login', credenciais, { auth: false })
  setToken(resp.token)
  return resp.usuario
}

export async function cadastrarCliente(dados) {
  return api.post('/auth/cadastro', dados, { auth: false })
}

export async function carregarUsuarioAtual() {
  return api.get('/auth/me')
}

export function logout() {
  setToken(null)
}
