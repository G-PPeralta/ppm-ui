import { useState } from 'react';

import { useFormik } from 'formik';
import { loginSchema } from 'validations/Login';

import { useToast } from 'contexts/Toast';

import { useAuth } from './useAuth';

export function useLogin() {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (values.email === '' || values.senha === '') {
        toast.error('Preencha todos os campos', {
          id: 'toast-principal',
        });
        return;
      }
      try {
        setLoading(true);

        await signIn(values.email, values.senha);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return {
    loginForm,
    loading,
  };
}
