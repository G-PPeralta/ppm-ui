import { useState } from 'react';

import { useFormik } from 'formik';
import { cadastroIntervencaoSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { postCadastroIntervencao } from 'services/post/CadastroModaisInfograficos';

export function useCadastroIntervencao() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const intervencaoForm = useFormik({
    initialValues: {
      poco: '',
      campo: '',
      sonda: '',
      sequencia: '',
      inicioPrevisto: '',
      projeto: '',
      observacoes: '',
    },
    validationSchema: cadastroIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues = {
        poco: values.poco,
        campo: values.campo,
        sonda: values.sonda,
        sequencia: values.sequencia,
        inicioPrevisto: values.inicioPrevisto,
        projeto: values.projeto,
        observacoes: values.observacoes,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroIntervencao(newValues);

        if (status === 200 || status === 201) {
          toast.success('Intervenção cadastrada com sucesso!', {
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
    intervencaoForm,
    loading,
  };
}
