// Camada de comunicação HTTP com a API Spring Boot.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'
const TOKEN_KEY = 'aluguel.token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

/** Erro de API com status HTTP e mensagem amigável extraída do ProblemDetail. */
export class ApiError extends Error {
  constructor(status, mensagem, detalhes) {
    super(mensagem)
    this.status = status
    this.detalhes = detalhes
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let resp
  try {
    resp = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Verifique se a API está no ar.')
  }

  if (resp.status === 204) return null

  let dados = null
  const texto = await resp.text()
  if (texto) {
    try {
      dados = JSON.parse(texto)
    } catch {
      dados = { detail: texto }
    }
  }

  if (!resp.ok) {
    const mensagem = dados?.detail || 'Ocorreu um erro inesperado.'
    throw new ApiError(resp.status, mensagem, dados?.erros)
  }
  return dados
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
}
