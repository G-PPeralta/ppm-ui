export interface ProjetosLookahead {
  id: number;
  item?: number;
  nome_projeto: string;
  descricao: string;
  justificativa: string;
}

export interface AtividadesLookahead {
  id: number;
  id_pai: number;
  ordem: number;
  nom_atividade: string;
  pct_real: number;
  dat_ini_plan?: string;
  dat_fim_plan?: string;
  dat_ini_real?: string;
  dat_fim_real?: string;
  dat_ini_base?: string;
  dat_fim_base?: string;
  id_projeto: number;
}

export interface FerramentasAtividade {
  id: number;
  atividade_id: number;
  nome: string;
  data_hora: string;
  anotacoes?: string;
}

export interface ServicosAtividade {
  id: number;
  atividade_id: number;
  nome: string;
  data_hora: string;
  anotacoes?: string;
}

export interface CreateServicoFerramenta {
  nome: string;
  atividade_id: number;
  data_hora: string;
  anotacoes?: string;
}
