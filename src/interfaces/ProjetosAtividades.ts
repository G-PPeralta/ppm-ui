// CRIADO EM: 04/10/2022
// AUTOR: MAXWELL MORAIS
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DAS ATIVIDADES DO MÓDULO DE PROJETOS

export interface ProjetosAtividades {
  id?: number;
  nome_projeto: string;
  descricao: string;
  justificativa: string;
  valor_total_previsto: number;
  data_inicio: Date;
  data_fim: Date;
  polo_id: number;
  local_id: number;
  solicitante_id: number;
  classificacao_id: number;
  divisao_id: number;
  gate_id: number;
  tipo_projeto_id: number;
  demanda_id: number;
  status_id: number;
  prioridade_id: number;
  complexidade_id: number;
  dataInicio_real: Date;
  dataFim_real: Date;
  comentarios: string;
  deletado: boolean;
  item: number;
  numero: number;
  responsavel_id: number;
  coordenador_id: number;
  elemento_pep: string;
  id_pai: number;
  ordem: number;
  nom_atividade: string;
  pct_real: number;
  dat_ini_plan: Date;
  dat_fim_plan: Date;
  dat_ini_real: Date;
  dat_fim_real: Date;
  dat_ini_base: Date;
  dat_fim_base: Date;
  nom_usu_create: string;
  dat_usu_create: string;
  nom_usu_edit: string;
  dat_usu_edit: Date;
  nom_usu_erase: string;
  dat_usu_erase: Date;
  id_projeto: number;
  pct_plan: string;
}
