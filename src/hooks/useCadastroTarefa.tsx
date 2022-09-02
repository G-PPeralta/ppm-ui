import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroTarefaSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { postCadastroTarefa } from 'services/post/CadastroModaisInfograficos';

export function useCadastroTarefa() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      nomeTarefa: '',
    },
    validationSchema: cadastroTarefaSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomeTarefa: values.nomeTarefa,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroTarefa(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Tarefa ${values.nomeTarefa} cadastrada com sucesso!`, {
            id: 'toast-principal',
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar tarefa ${values.nomeTarefa}!`, {
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
