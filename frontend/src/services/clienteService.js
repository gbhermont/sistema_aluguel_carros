import { api } from './api.js'

export function consultarMeuCadastro() {
  return api.get('/clientes/me')
}

export function atualizarMeuCadastro(dados) {
  return api.put('/clientes/me', dados)
}

export function removerMeuCadastro() {
  return api.del('/clientes/me')
}
