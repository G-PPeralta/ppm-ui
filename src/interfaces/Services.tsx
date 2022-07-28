export interface LoginProps {
  email: string;
  senha: string;
}

export interface User {
  id: number;
  area_atuacao: string;
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
  area_atuacao: string;
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
  area_atuacao: string;
  avatar: string;
  role_id: number;
  nome_role: string;
}

export interface ResponseUserPending {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  area_atuacao: string;
  avatar: string;
  nome_role: string;
}

export interface RegisterProjectProps {
  name: string;
  description: string;
  budget: number;
  classification: string;
  requester: string;
  justification: string;
  pole: string;
  start: string;
  end: string;
  startReal: string;
  endReal: string;
  priority: string;
  complexity: string;
  place: string;
  division: string;
  status: string;
  gate: string;
  typeProject: string;
  demand: string;
  comments: string;
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
