export interface Atividade {
  atividade_id_origem: string;
  area_id: number;
  tarefa_id: number;
  qtde_dias: number;
  id_origem: number;
  area_atuacao: number;
  precedentes?: [
    {
      id: number;
      nome: string;
      checked: boolean;
    }
  ];
  fase_id: number;
}

export interface Atividades {
  id_origem: string;
  area_id: number;
  tarefa_id: number;
  qtde_dias: number;
  area_atuacao_id: number;
  precedentes?: [
    {
      id: number;
      nome: string;
      checked: boolean;
    }
  ];
}

export interface AtividadesDr {
  id_origem: string;
  area_id: number;
  tarefa_id: number;
  qtde_dias: number;
  ind_atv_execucao: boolean;
  precedentes?: [
    {
      id: number;
      nome: string;
      checked: boolean;
    }
  ];
}

export interface Opcoes {
  name: string;
  id: number;
  sonda: number;
}

export interface Sondas {
  name: string;
  id: number;
}

export interface Sonda {
  sonda: string;
  id_campanha: number;
}

export interface Status {
  id: number;
  status: string;
  color: string;
  texto: string;
}

export interface ServicosPocos {
  id: number;
  nom_poco: string;
  dat_ini_limite: string;
  ordem: number;
}
