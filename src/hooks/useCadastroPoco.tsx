import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroTarefaSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { postCadastroPoco } from 'services/post/CadastroModaisInfograficos';

export function useCadastroPoco() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      nomePoco: '',
    },
    validationSchema: cadastroTarefaSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomePoco: values.nomePoco,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroPoco(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Poço ${values.nomePoco} cadastrado com sucesso!`, {
            id: 'toast-principal',
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar poço ${values.nomePoco}!`, {
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
