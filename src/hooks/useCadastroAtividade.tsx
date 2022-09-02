import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroAtividadeSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { postCadastroAtividade } from 'services/post/CadastroModaisInfograficos';

export function useCadastroAtividade() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      nomeId: '',
      nomeAtividade: '',
      responsavel: '',
      area: '',
      precedente: [
        {
          id: '',
          tarefa: '',
          tipo: '',
          dias: 0,
          restricao: '',
        },
      ],
      comentarios: '',
    },
    validationSchema: cadastroAtividadeSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomeId: values.nomeId,
        nomeAtividade: values.nomeAtividade,
        responsavel: values.responsavel,
        area: values.area,
        precedente: values.precedente,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroAtividade(newValues);

        if (status === 200 || status === 201) {
          toast.success('Atividade cadastrada com sucesso!', {
            id: 'toast-principal',
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error('Erro ao cadastrar atividade!', {
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
