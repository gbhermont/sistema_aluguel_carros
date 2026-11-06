// Rótulos e formatadores compartilhados pelas telas.

export const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em análise',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
  CANCELADO: 'Cancelado',
  EXECUTADO: 'Executado',
}

export function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Regras de status (docs/historias-de-usuario.md)
export const podeClienteModificar = (s) => s === 'PENDENTE' || s === 'EM_ANALISE'
export const podeCancelar = (s) => s !== 'EXECUTADO' && s !== 'CANCELADO'
