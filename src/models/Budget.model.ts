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
