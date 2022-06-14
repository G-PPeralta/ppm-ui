import { useState } from 'react';

import { useFormik } from 'formik';
import { registerSchema } from 'validations/Register';

import { useToast } from 'contexts/Toast';

export function useRegister() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      name: '',
      telefone: '',
      email: '',
      area: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (values) {
        console.log(values);
        toast.success('Cadastro realizado com sucesso!');
        setLoading(false);
      } else {
        console.log('Não tem valores');
      }
      setLoading(false);
    },
  });

  return {
    registerForm,
    loading,
  };
}
