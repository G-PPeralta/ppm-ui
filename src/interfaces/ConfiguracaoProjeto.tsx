import {
  Classificacao,
  Coordenador,
  Gate,
  LocalProjeto,
  Polo,
  ResponsavelProjeto,
  Solicitante,
  StatusProjeto,
  TipoProjeto,
} from "./Services";

export interface IUpdateProjetoDto {
  nome_responsavel: number;
  coordenador_nome: number;
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

export interface IConfigProjetoDto {
  responsavel: ResponsavelProjeto;
  coordenador: Coordenador;
  status: StatusProjeto;
  polo: Polo;
  local: LocalProjeto;
  solicitacao: Solicitante;
  nome_projeto: string;
  elemento_pep: string;
  data_inicio: Date | null;
  data_fim: Date | null;
  divisao: number;
  classificacao: Classificacao;
  tipo: TipoProjeto;
  gate: Gate;
}
