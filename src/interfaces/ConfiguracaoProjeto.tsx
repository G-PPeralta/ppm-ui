export interface IConfigProjetoDto {
  responsavel: number;
  coordenador: number;
  status: number;
  polo: number;
  local: number;
  solicitacao: number;
  nome_projeto: string;
  elemento_pep: string;
  data_inicio: Date | null;
  data_fim: Date | null;
  divisao: number;
  classificacao: number;
  tipo: number;
  gate: number;
}
