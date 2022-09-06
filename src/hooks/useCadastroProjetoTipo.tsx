import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroProjetoTipoSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { postProjetoTipo } from 'services/post/CadastroModaisInfograficos';

export function useCadastroProjetoTipo() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      nomeProjeto: '',
      atividades: [
        {
          base: '',
          tarefa: '',
          precedente: '',
          dias: 0,
        },
      ],
      comentarios: '',
    },
    validationSchema: cadastroProjetoTipoSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomeProjeto: values.nomeProjeto,
        atividades: values.atividades,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postProjetoTipo(newValues);

        if (status === 200 || status === 201) {
          toast.success('Projeto Tipo cadastrado com sucesso!', {
            id: 'toast-principal',
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error('Erro ao cadastrar intervenção!', {
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
