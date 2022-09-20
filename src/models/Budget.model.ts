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
