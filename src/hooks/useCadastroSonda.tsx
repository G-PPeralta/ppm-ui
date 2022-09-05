import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroSondaSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { postCadastroSonda } from 'services/post/CadastroModaisInfograficos';

export function useCadastroSonda() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      nomeSpt: '',
    },
    validationSchema: cadastroSondaSchema,
    onSubmit: async (values) => {
      const newValues = {
        nome: values.nomeSpt,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroSonda(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Sonda ${values.nomeSpt} cadastrada com sucesso!`, {
            id: 'toast-principal',
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar sonda ${values.nomeSpt}!`, {
          id: 'toast-principal',
        });
        setLoading(false);
      }
    },
  });

  return {
    registerForm,
    loading,
  };
}
