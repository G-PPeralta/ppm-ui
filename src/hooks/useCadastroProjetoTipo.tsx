import { useState } from 'react';

import { useFormik } from 'formik';
import { registerProjectTypeSchema } from 'validations/RegisterProjectType';

import { useToast } from 'contexts/Toast';

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
    validationSchema: registerProjectTypeSchema,
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

      console.log(newValues);
      toast.succes('Tipo de projeto cadastrado com sucesso', {
        id: 'toast-principal',
      });
    },
  });

  return {
    registerForm,
    loading,
  };
}
