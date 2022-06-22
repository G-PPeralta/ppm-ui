export interface LoginProps {
  email: string;
  password: string;
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