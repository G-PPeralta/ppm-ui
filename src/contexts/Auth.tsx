import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContextProps, UserContextProps } from 'interfaces/Contexts';

import { getUserPending } from 'services/get/User';
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

  async function signIn(email: string, senha: string): Promise<void> {
    const newValues = {
      email,
      senha,
    };

    try {
      const { data, status } = await postLogin(newValues);

      if (status === 200 || status === 201) {
        sessionStorage.setItem('@Origem:token', data.access_token || '');
        sessionStorage.setItem('@Origem:refresh', data.refresh_token || '');

        if (!data.user) return;

        const { data: dataUser, status } = await getUserPending(
          String(data?.user?.id),
        );

        if (status === 200) {
          sessionStorage.setItem('@Origem:user', JSON.stringify(dataUser[0]));
        }

        setUser(dataUser[0] as {});

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
        setUser,
        signed: isSigned(),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
