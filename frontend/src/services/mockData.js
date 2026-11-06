// Dados estáticos (mock) para o protótipo de telas.
// Serão substituídos por chamadas à API REST do Spring Boot (VITE_API_URL).
// Estrutura alinhada ao docs/diagrama-de-classes.md.

export const usuarios = [
  { id: 1, nome: 'Maria Silva', login: 'cliente@email.com', perfil: 'CLIENTE' },
  { id: 2, nome: 'Locadora Alfa', login: 'empresa@email.com', perfil: 'AGENTE', tipo: 'EMPRESA' },
  { id: 3, nome: 'Banco Beta', login: 'banco@email.com', perfil: 'AGENTE', tipo: 'BANCO' },
]

export const cliente = {
  id: 1,
  nome: 'Maria Silva',
  rg: 'MG-12.345.678',
  cpf: '123.456.789-00',
  endereco: 'Rua das Flores, 100 - Belo Horizonte/MG',
  profissao: 'Engenheira',
  rendimentos: [
    { id: 1, entidadeEmpregadora: 'Empresa X', valor: 6500 },
    { id: 2, entidadeEmpregadora: 'Freelance Y', valor: 1200 },
  ],
}

export const automoveis = [
  { id: 1, matricula: 'MAT-0001', ano: 2023, marca: 'Fiat', modelo: 'Argo', placa: 'ABC1D23', disponivel: true },
  { id: 2, matricula: 'MAT-0002', ano: 2022, marca: 'Volkswagen', modelo: 'Polo', placa: 'DEF4G56', disponivel: true },
  { id: 3, matricula: 'MAT-0003', ano: 2024, marca: 'Chevrolet', modelo: 'Onix', placa: 'HIJ7K89', disponivel: false },
  { id: 4, matricula: 'MAT-0004', ano: 2021, marca: 'Toyota', modelo: 'Corolla', placa: 'LMN0P12', disponivel: true },
]

export const pedidos = [
  { id: 101, clienteId: 1, clienteNome: 'Maria Silva', automovelId: 1, dataCriacao: '2026-11-02T10:15', dataAtualizacao: '2026-11-02T10:15', status: 'PENDENTE', parecer: '' },
  { id: 102, clienteId: 1, clienteNome: 'Maria Silva', automovelId: 2, dataCriacao: '2026-10-28T14:00', dataAtualizacao: '2026-10-30T09:20', status: 'EM_ANALISE', parecer: '' },
  { id: 103, clienteId: 1, clienteNome: 'Maria Silva', automovelId: 4, dataCriacao: '2026-10-10T08:30', dataAtualizacao: '2026-10-12T16:45', status: 'APROVADO', parecer: 'Renda compatível com o valor do aluguel.' },
  { id: 104, clienteId: 1, clienteNome: 'Maria Silva', automovelId: 3, dataCriacao: '2026-09-15T11:00', dataAtualizacao: '2026-09-20T13:10', status: 'EXECUTADO', parecer: 'Aprovado com crédito bancário.' },
]

export const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em análise',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
  CANCELADO: 'Cancelado',
  EXECUTADO: 'Executado',
}

export function getAutomovel(id) {
  return automoveis.find((a) => a.id === Number(id))
}

export function getPedido(id) {
  return pedidos.find((p) => p.id === Number(id))
}

export function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Regras de status (docs/historias-de-usuario.md)
export const podeClienteModificar = (s) => s === 'PENDENTE' || s === 'EM_ANALISE'
export const podeCancelar = (s) => s !== 'EXECUTADO' && s !== 'CANCELADO'
