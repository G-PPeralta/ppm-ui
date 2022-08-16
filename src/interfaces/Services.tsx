export interface LoginProps {
  email: string;
  senha: string;
}

export interface User {
  id: number;
  areaAtuacao: string;
  email: string;
  nome: string;
  perfil: string;
  telefone: string;
}

export interface ResponseLogin {
  validatedUser?: boolean;
  user?: User;
  access_token?: string;
  refresh_token?: string;
}

export interface RegisterProps {
  id?: number;
  areaAtuacao: string;
  email: string;
  nome: string;
  perfil?: string;
  telefone: string;
}

export interface ResponseRoles {
  id: number;
  role: string;
  nome_role: string;
}

export interface ResponseAvatar {
  avatar: string;
}

export interface ResponsePermissions {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  areaAtuacao: string;
  avatar: string;
  role_id: number;
  nome_role: string;
}

export interface ResponseUserPending {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  areaAtuacao: string;
  avatar: string;
  nome_role: string;
}

export interface ResponsavelProjeto {
  nomeResponsavel: string;
  tipoResponsavel: number;
}

export interface RegisterProjectProps {
  nomeProjeto: string;
  descricao: string;
  valorTotalPrevisto: number;
  classificacaoId: number;
  solicitanteId: number;
  justificativa: string;
  poloId: number;
  dataInicio: string;
  dataFim: string;
  dataInicioReal: string;
  dataFimReal: string;
  prioridadeId: number;
  complexidadeId: number;
  localId: number;
  divisaoId: number;
  statusId: number;
  gateId: number;
  tipoProjetoId: number;
  demandaId: number;
  comentarios: string;
  responsavelId: number[];
  coordenadorId: number[];
}

export interface GanttPayload {
  nome_projeto: string;
  data_inicio: Date;
  data_fim: Date;
  microatividade_id: number;
  nome_atividade: string;
  item: string;
  macroatividade_id: number;
  macroatividade_nome: string;
  macroatividade_item: number;
  duracao: number;
  progresso: number;
}

export interface GanttProps {
  TaskID: number;
  Item: string;
  TaskName: string;
  StartDate?: string;
  Duration?: number;
  Progress?: number;
  subtasks?: GanttProps[];
}
export interface GanttMacroDto {
  macroatividade_id: number;
  macroatividade_item: string;
  macroatividade_nome: string;
  duracao?: number;
  progresso?: number;
  data_inicio?: string;
  data_fim?: string;
  item?: string;
  microatividade_id?: number;
  nome_atividade?: string;
  nome_projeto?: string;
  micro?: GanttMacroDto[];
}

export interface IGantt {
  nomeProjeto: string;
  macroatividades: GanttMacroDto[];
}

export interface TipoResponsavel {
  id: number;
  tipo_responsavel: string;
}

export interface Classificacao {
  id: number;
  classificacao: string;
  deletado: boolean;
}

export interface Polo {
  id: number;
  polo: string;
  deletado: boolean;
}

export interface Solicitante {
  id: number;
  solicitante: string;
  deletado: boolean;
}

export interface Prioridade {
  id: number;
  prioridade: string;
  deletado: boolean;
}

export interface Complexidade {
  id: number;
  complexidade: string;
  deletado: boolean;
}

export interface LocalProjeto {
  id: number;
  local: string;
  deletado: boolean;
}

export interface Divisao {
  id: number;
  divisao: string;
  deletado: boolean;
}

export interface StatusProjeto {
  id: number;
  status: string;
  deletado: boolean;
}

export interface Gate {
  id: number;
  gate: string;
  deletado: boolean;
}

export interface TipoProjeto {
  id: number;
  tipo: string;
  deletado: boolean;
}

export interface Demanda {
  id: number;
  demanda: string;
  deletado: boolean;
}

export interface TotalOrcamento {
  totalOrcamento: number;
}

export interface AreasDemandadas {
  qtd: number;
  solicitante: string;
}

export interface ComplexidadesPrioridades {
  alta: number;
  media: number;
  baixa: number;
  nula: number;
}

export interface ProjetosPorStatus {
  id: number;
  status: string;
  qtd: number;
}

export interface TotalDeProjetos {
  complexidades: ComplexidadesPrioridades;
  prioridades: ComplexidadesPrioridades;
  projetosPorStatus: ProjetosPorStatus[];
  totalProjetos: number;
}

export interface ProjetosInfo {
  id: number;
  nomeProjeto: string;
  valorTotalPrevisto: number;
  cpi?: any;
  spi?: any;
}

export interface RegistroResponsavel {
  nomeResponsavel: string;
}

export interface RegistroCoordenador {
  nomeCoordenador: string;
}
