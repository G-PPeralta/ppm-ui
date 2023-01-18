// CRIADO EM: 12/12/2022
// AUTOR: GEOVANA AUGUSTA
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACE DO EDITAR ATIVIDADE

export interface EditarAtividade {
  id_atividade: number;
  nome_atividade: string;
  fim_realizado: string;
  inicio_realizado: string;
  pct_real?: number;
}
