import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroAtividadeSchema } from 'validations/CadastroAtividade';

import { useToast } from 'contexts/Toast';

import { postCadastroAtividade } from 'services/post/CadastroAtividade';

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
        }
      } catch (error) {
        toast.error('Erro ao cadastrar intervenção!', {
          id: 'toast-principal',
        });
      }
    },
  });

  return {
    registerForm,
    loading,
  };
}
