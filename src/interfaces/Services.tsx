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
