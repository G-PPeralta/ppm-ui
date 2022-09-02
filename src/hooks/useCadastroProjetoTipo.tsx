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
      nomeId: '',
      nomeProjeto: '',
      atividadeId: '',
      atividadeBase: '',
      atividadeTarefa: '',
      atividadePrecedente: '',
      atividadeDias: '',
      comentarios: '',
    },
    validationSchema: cadastroProjetoTipoSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomeId: values.nomeId,
        nomeProjeto: values.nomeProjeto,
        atividadeId: values.atividadeId,
        atividadeBase: values.atividadeBase,
        atividadeTarefa: values.atividadeTarefa,
        atividadePrecedente: values.atividadePrecedente,
        atividadeDias: values.atividadeDias,
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
