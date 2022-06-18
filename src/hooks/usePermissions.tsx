import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import { registerSchema } from 'validations/Register';

import { useToast } from 'contexts/Toast';

export function usePermissions() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const permissionsForm = useFormik({
    initialValues: {
      name: '',
      telephone: '',
      email: '',
      area: '',
      accessLevel: '',
      avatar: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (values) {
        console.log(values);
        toast.success('Cadastro realizado com sucesso!');
        setLoading(false);
        navigate('/');
      } else {
        console.log('Não tem valores');
      }
      setLoading(false);
    },
  });

  return {
    permissionsForm,
    loading,
  };
}
