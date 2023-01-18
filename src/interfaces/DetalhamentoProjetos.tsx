// CRIADO EM: 17/08/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DO CARD DE PROJETOS

export interface ICardInfoProjeto {
  id?: number;
  nome_projeto: string;
  campo_id: string;
  data_inicio: null;
  data_fim: null;
  numero: number;
  polo: string;
  local: string;
  demanda: string;
  nome_responsavel: string;
  coordenador_nome: string;
  descricao: string;
  justificativa: string;
  atraso?: number;
  solicitante?: string;
  dat_usu_update?: string;
}
