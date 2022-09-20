export interface Budget {
  id: number;
  item: string;
  projeto: string;
  planejado: number;
  realizado: number;
  gap: number;
  descricao: string;
  filhos?: Budget[];
}
