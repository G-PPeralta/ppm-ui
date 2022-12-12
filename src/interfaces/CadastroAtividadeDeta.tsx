export interface Atividade {
  id: number;
  nome_projeto: string;
  data_inicio: null;
  data_fim: null;
  numero: null;
  polo: string;
  local: string;
  demanda: null;
  descricao: string;
  justificativa: string;
  nome_responsavel: string;
  coordenador_nome: string;
  solicitante: string;
  atraso: number;
  dat_usu_update: null;
}

export interface Relacao {
  id: number;
  valor: string;
}

export interface Precedentes {
  dias: number;
  atividadePrecedenteId: number;
}

export interface Label {
  value: number;
  label: string;
}
