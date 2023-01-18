// CRIADO EM: 25/10/2022
// AUTOR: MAXWELL MORAIS
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DO FILTRO DO CRONOGRAMA

export interface FiltroCronograma {
  pocoId: number;
  sondaId: number;
  profundidadeIni: number;
  profundidadeFim: number;
  metodoElevacao?: string;
  metodoElevacaoId: number;
  dataDe: string;
  dataAte: string;
}
