import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import {
  ListaPoco,
  ListaProjetoTipo,
  ListaSonda,
} from 'interfaces/CadastrosModaisInfograficos';
// import { cadastroIntervencaoSchema } from 'validations/ModaisCadastrosInfografico';

import { useToast } from 'contexts/Toast';

import {
  getSondas,
  getPocos,
  getProjetosTipo,
  getResponsaveis,
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
  const [listaResponsaveis, setListaResponsaveis] = useState<any[]>([]);

  const reqGet = async () => {
    const sondas = await getSondas();
    const pocos = await getPocos();
    const projetosTipo = await getProjetosTipo();
    const responsaveis = await getResponsaveis();

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
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome),
    );

    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
    setListaProjetosTipo(projetosTipoSorted);
    setListaResponsaveis(responsaveisSorted);
  };

  const intervencaoForm = useFormik({
    initialValues: {
      nome: '',
      pocoId: 0,
      sptId: 0,
      tipoProjetoId: 0,
      inicioPlanejado: '',
      fimPlanejado: '',
      atividades: [
        {
          ordem: 1,
          atividade: '',
          responsavel: '',
        },
      ],
      observacoes: '',
    },
    // validationSchema: cadastroIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues = {
        nome: values.nome,
        pocoId: values.pocoId,
        sptId: values.sptId,
        tipoProjetoId: values.tipoProjetoId,
        inicioPlanejado: values.inicioPlanejado,
        fimPlanejado: values.fimPlanejado,
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
    listaProjetosTipo,
    listaResponsaveis,
  };
}
