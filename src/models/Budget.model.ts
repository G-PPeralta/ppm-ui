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
  servico: string;
  fornecedor?: string;
  total: number;
  previsto: number;
  realizado: number;
  gap?: number;
  filhos?: BudgetDetail[];
}
