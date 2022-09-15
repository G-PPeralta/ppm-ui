import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { cadastroIntervencaoSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import { getSondas, getPocos } from 'services/get/CadastroModaisInfograficos';
import { postCadastroIntervencao } from 'services/post/CadastroModaisInfograficos';

export function useCadastroIntervencao() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<any[]>([]);

  const reqGet = async () => {
    const sondas = await getSondas();
    const pocos = await getPocos();
    const sondasSorted = sondas.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome),
    );

    const pocosSorted = pocos.data.sort((a: any, b: any) =>
      a.poco.localeCompare(b.poco),
    );
    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
  };

  const intervencaoForm = useFormik({
    initialValues: {
      nome: '',
      poco: '',
      sonda: '',
      inicioPrevisto: '',
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
        nome: values.nome,
        poco: values.poco,
        sonda: values.sonda,
        inicioPrevisto: values.inicioPrevisto,
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

  useEffect(() => {
    reqGet();
  }, []);

  return {
    intervencaoForm,
    loading,
    listaSondas,
    listaPocos,
  };
}
