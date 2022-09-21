export interface Atividade {
  atividade: string;
  comp_pct: number;
  finalplanejado: string;
  id_poco: number;
  inicioplanejado: string;
  pct_plan: number;
  pct_real: number;
  qtddias: number;
  sonda: string;
}

export interface Status {
  status: string;
  qtde: number;
}

export interface Area {
  area: string;
  atividades: Atividade[];
  pctTotalConcluido: number;
  status: Status[];
  totalAtividades: number;
}
