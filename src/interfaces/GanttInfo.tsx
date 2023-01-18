// CRIADO EM: 18/07/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACE DE MICROATIVIDADES DO GANTT

export interface GanttMicroTasks {
  nome_projeto?: string;
  data_inicio?: string;
  data_fim?: string;
  microatividade_id?: number;
  nome_atividade?: string;
  item?: string;
  macroatividade_id?: number;
  macroatividade_nome?: string;
  macroatividade_item?: string;
  duracao?: number;
  progresso?: string;
}
