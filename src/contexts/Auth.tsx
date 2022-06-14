import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContextProps, UserContextProps } from 'interfaces/Contexts';

import { useToast } from './Toast';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: any) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserContextProps>();

  function isSigned() {
    const storagedUser = sessionStorage.getItem('@Origem:user');
    const storagedToken = sessionStorage.getItem('@Origem:token');

    if (storagedUser && storagedToken) {
      return true;
    }

    return false;
  }

  async function signIn(username: string, password: string): Promise<void> {
    const newValues = {
      username,
      password,
    };

    try {
      toast.loading('Autenticando...', {
        id: 'toast-principal',
      });

      if (newValues) {
        // sessionStorage.setItem('@Origem:user', JSON.stringify(newValues));
        sessionStorage.setItem(
          '@Origem:token',
          '083589ed-969b-427b-967a-97c5e82657bb' || '',
        );
        sessionStorage.setItem(
          '@Origem:refresh',
          '75227e3d-4087-449e-bfc0-a52b7138ed49' || '',
        );

        const newUser = {
          id: '0001',
          nome: 'João',
          email: 'joao.01@gmail.com',
          telefone: '11999999999',
          cargo: 'Admin',
        };

        setUser(newUser);
        sessionStorage.setItem('@Origem:user', JSON.stringify(newUser));

        toast.success('Login realizado com sucesso', {
          id: 'toast-principal',
        });

        navigate('/');
      } else {
        toast.error('Usuário ou senha inválidos', {
          id: 'toast-principal',
        });
      }
    } catch (error: any) {
      toast.error(`Usuário ou senha inválidos`, {
        id: 'toast-principal',
      });
    }
  }

  function signOut() {
    sessionStorage.removeItem('@Origem:user');
    sessionStorage.removeItem('@Origem:token');
    sessionStorage.removeItem('@Origem:refresh');
    setUser(undefined);
    navigate('/');
  }

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@Origem:user');
    const storagedToken = sessionStorage.getItem('@Origem:token');

    if (storagedToken && storagedUser) {
      const userGlobal = JSON.parse(storagedUser);
      setUser(userGlobal);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: isSigned(),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
