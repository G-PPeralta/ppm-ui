export interface UserContextProps {
  id?: string;
  nome?: string;
  email?: string;
  telephone?: string;
  perfil?: string;
  avatar?: string;
  nome_role?: string;
  role_id?: number;
}

export interface AuthContextProps {
  user: UserContextProps | undefined;
  setUser: (user: UserContextProps) => void;
  signed: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}
