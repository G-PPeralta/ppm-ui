export interface IDadosAtividades {
  id: number;
  nom_atividade: string;
  vlr_planejado: number;
  vlr_realizado: number;
  id_responsavel: number;
  nome_responsavel: string;
  fase: string;
  dat_ini_plan: string;
  dat_fim_plan: string;
  dat_ini_real: string;
  dat_fim_real: string;
}
