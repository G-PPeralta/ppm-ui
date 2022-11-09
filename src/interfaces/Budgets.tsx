export interface BudgetPlan {
  atividadeId: number;
  valor: number;
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
  id?: number;
  atividadeId?: number;
  valor: number;
  data: any;
  fornecedor: string;
  classeServico: string;
  pedido: number;
  textPedido: string;
  nom_usu_create?: string;
  nom_usu_edit?: string;
}

export interface Totalizacao {
  inicio: string;
  fim: string;
  custoDiarioTotalBRL: number;
  custoDiarioTotalUSD: number;
  custoTotalRealizadoBRL: number;
  custoTotalRealizadoUSD: number;
  custoTotalTotalPrevistoBRL: number;
  custoTotalTotalPrevistoUSD: number;
  totalBRL: number;
  totalUSD: number;
}

export interface Titulo {
  poco_nome: string;
  sonda_nome: string;
}

export interface Result {
  totalizacao: Totalizacao;
  list: BudgetDetail[];
  titulo: Titulo;
}

export interface ClasseServico {
  id: number;
  classe_servico: string;
}

/*
interface CustoDiarioFilho {
  id: number;
  index: string;
  atividade: string;
  fornecedor: string;
  realizado: number;
} */
export interface CustoDiario {
  id: number;
  atividade: string;
  date: string;
  pedido: string;
  txt_pedido: string;
  fornecedor: string;
  realizado: number;
}

export interface Realizado {
  id: number;
  id_atividade: number;
  id_fornecedor: number;
  classe_servico: any;
  dat_lcto: string;
  vlr_realizado: number;
  txt_observacao: string;
  num_pedido: number;
}
