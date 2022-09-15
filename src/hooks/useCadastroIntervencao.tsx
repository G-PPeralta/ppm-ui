import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import {
  ListaPoco,
  ListaProjetoTipo,
  ListaSonda,
} from 'interfaces/CadastrosModaisInfograficos';
import { cadastroIntervencaoSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import {
  getSondas,
  getPocos,
  getProjetosTipo,
} from 'services/get/CadastroModaisInfograficos';
import { postCadastroIntervencao } from 'services/post/CadastroModaisInfograficos';

export function useCadastroIntervencao() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<ListaSonda[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);
  const [listaProjetosTipo, setListaProjetosTipo] = useState<
    ListaProjetoTipo[]
  >([]);

  const reqGet = async () => {
    const sondas = await getSondas();
    const pocos = await getPocos();
    const projetosTipo = await getProjetosTipo();

    const sondasSorted = sondas.data.sort((a: ListaSonda, b: ListaSonda) =>
      a.nome.localeCompare(b.nome),
    );
    const pocosSorted = pocos.data.sort((a: ListaPoco, b: ListaPoco) =>
      a.poco.localeCompare(b.poco),
    );
    const projetosTipoSorted = projetosTipo.data.sort(
      (a: ListaProjetoTipo, b: ListaProjetoTipo) =>
        a.nome.localeCompare(b.nome),
    );

    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
    setListaProjetosTipo(projetosTipoSorted);
  };

  const intervencaoForm = useFormik({
    initialValues: {
      nome: '',
      pocoId: 0,
      sondaId: 0,
      projetoId: 0,
      inicioPrevisto: '',
      atividades: [
        {
          ordem: 1,
          atividade: '',
          responsavel: '',
        },
      ],
      comentarios: '',
    },
    validationSchema: cadastroIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues = {
        nome: values.nome,
        pocoId: values.pocoId,
        sondaId: values.sondaId,
        projetoId: values.projetoId,
        inicioPrevisto: values.inicioPrevisto,
        atividades: values.atividades,
        comentarios: values.comentarios,
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
    listaProjetosTipo,
  };
}
