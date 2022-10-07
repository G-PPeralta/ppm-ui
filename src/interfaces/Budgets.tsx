export interface BudgetPlan {
  atividadeId: number;
  valor: string;
}
export interface Projeto {
  id: number;
  nome: string;
}

export interface Budget {
  id: number;
  item: string;
  projeto: Projeto;
  planejado: number;
  realizado: number;
  gap: number;
  descricao: string;
  filhos?: Budget[];
}

export interface BudgetDetail {
  id: number;
  data?: string;
  brt: string;
  projeto: Projeto;
  fornecedor?: string;
  planejado: number;
  realizado: number;
  gap?: number;
  filhos?: BudgetDetail[];
}

export interface BudgetReal {
  atividadeId: number;
  valor: number;
  data: string;
  fornecedor: string;
  classeServico: string;
  pedido: number;
  textPedido: string;
  nom_usu_create?: string;
}
