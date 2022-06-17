export interface UserContextProps {
  id?: string;
  nome?: string;
  email?: string;
  telephone?: string;
  cargo?: string;
}

export interface AuthContextProps {
  user: UserContextProps | undefined;
  signed: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}
