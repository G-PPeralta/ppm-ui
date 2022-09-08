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
      intervencao: '',
      poco: '',
      sonda: '',
      inicioPrevisto: '',
      fimPrevisto: '',
      projeto: '',
      atividades: [
        {
          ordem: 1,
          atividade: '',
          responsavel: '',
        },
      ],
      observacoes: '',
    },
    validationSchema: cadastroIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues = {
        intervencao: values.intervencao,
        poco: values.poco,
        sonda: values.sonda,
        inicioPrevisto: values.inicioPrevisto,
        fimPrevisto: values.fimPrevisto,
        projeto: values.projeto,
        atividades: values.atividades,
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
