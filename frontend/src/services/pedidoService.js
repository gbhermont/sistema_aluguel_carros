import { api } from './api.js'

// --- Cliente ---
export function listarMeusPedidos() {
  return api.get('/cliente/pedidos')
}

export function consultarMeuPedido(id) {
  return api.get(`/cliente/pedidos/${id}`)
}

export function criarPedido(automovelId) {
  return api.post('/cliente/pedidos', { automovelId })
}

export function modificarPedido(id, automovelId) {
  return api.put(`/cliente/pedidos/${id}`, { automovelId })
}

export function cancelarPedido(id) {
  return api.post(`/cliente/pedidos/${id}/cancelamento`)
}

// --- Agente ---
export function listarPedidosAgente(status) {
  const query = status && status !== 'TODOS' ? `?status=${status}` : ''
  return api.get(`/agente/pedidos${query}`)
}

export function consultarPedidoAgente(id) {
  return api.get(`/agente/pedidos/${id}`)
}

export function iniciarAnalise(id) {
  return api.post(`/agente/pedidos/${id}/analise`)
}

export function registrarParecer(id, aprovado, parecer) {
  return api.post(`/agente/pedidos/${id}/parecer`, { aprovado, parecer })
}

export function executarContrato(id) {
  return api.post(`/agente/pedidos/${id}/execucao`)
}

// --- Automóveis ---
export function listarAutomoveisDisponiveis() {
  return api.get('/automoveis/disponiveis')
}
