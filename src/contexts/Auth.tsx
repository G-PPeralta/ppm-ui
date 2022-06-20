import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContextProps, UserContextProps } from 'interfaces/Contexts';

import { postLogin } from 'services/post/Login';

import { useToast } from './Toast';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: any) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserContextProps>({});

  function isSigned() {
    const storagedUser = sessionStorage.getItem('@Origem:user');
    const storagedToken = sessionStorage.getItem('@Origem:token');

    if (storagedUser && storagedToken) {
      return true;
    }

    return false;
  }

  async function signIn(email: string, password: string): Promise<void> {
    const newValues = {
      email,
      password,
    };

    try {
      const { data, status } = await postLogin(newValues);

      if (status === 200 || status === 201) {
        sessionStorage.setItem('@Origem:user', JSON.stringify(data.user));
        sessionStorage.setItem('@Origem:token', data.access_token || '');
        sessionStorage.setItem('@Origem:refresh', data.refresh_token || '');

        setUser(data.user as {});

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
    setUser({});
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
