//  CRIADO EM: 10/2022
//  AUTOR: Eduardo Muchak, Bruno Alcantara.
//  DESCRIÇÃO DO ARQUIVO: Tipagem local

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

export interface PrecedentesId {
  precedente_id: number;
}

export interface RootArray {
  id_filho: number;
  id_atividade: number;
  fase: string;
  hoje: string;
  inicioplanejado: string;
  finalplanejado: string;
  qtddias: string;
  atividade: string;
  nom_responsavel: string;
  nom_area: string;
  sonda: string;
  comentario?: string;
  pct_plan: string;
  pct_real: number;
  id_poco: number;
  inicioreal: string;
  fimreal: string;
  inicioplanejadohrs: string;
  finalplanejadohrs: string;
  ind_status: number;
  comp_pct: number;
  precedentesId?: PrecedentesId[] | null;
}

export interface RootObject {
  RootArray?: RootArray[] | null;
}
