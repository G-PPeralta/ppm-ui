import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroNovaIntervencaoSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import {
  getPocos,
  getResponsaveis,
  getTarefas,
} from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  postGetInfoCampanha,
} from "services/get/Infograficos";

export function useFiltragemCampanha() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<any[]>([]);
  const [listaTarefas, setListaTarefas] = useState<any[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<any[]>([]);
  const [listaSondas, setListaSondas] = useState<any[]>([]);

  const initialValues: any = {
    area_atuacao_id: null,
    poco_id: null,
    atividade_id: null,
    responsavel_id: null,
    data_inicio: null,
    data_fim: null,
    sonda_id: null,
    status: null,
  };

  const reqGet = async () => {
    const areaAtuacao = await getAreaAtuacaoList();
    const pocos = await getPocos();
    const tarefas = await getTarefas();
    const responsaveis = await getResponsaveis();
    const campanha = await postGetInfoCampanha(initialValues);

    const arraySondas = campanha.data.map(({ sonda, id_campanha }: any) => ({
      sonda,
      id_campanha,
    }));

    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    const pocosSorted = pocos.data.sort((a: any, b: any) =>
      a.nom_poco.localeCompare(b.nom_poco)
    );
    const tarefasSorted = tarefas.data.sort((a: any, b: any) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );
    const sondasSorted = arraySondas.sort((a: any, b: any) =>
      a.sonda.localeCompare(b.sonda)
    );

    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaPocos(pocosSorted);
    setListaTarefas(tarefasSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaSondas(sondasSorted);
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroNovaIntervencaoSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        area_atuacao_id: values.area_atuacao_id,
        poco_id: values.poco_id,
        atividade_id: values.atividade_id,
        responsavel_id: values.responsavel_id,
        data_inicio: values.data_inicio,
        data_fim: values.data_fim,
        sonda_id: values.sonda_id,
        status: values.status,
      };

      setLoading(true);

      try {
        const { status } = await postGetInfoCampanha(newValues);

        if (status === 200 || status === 201) {
          toast.success("Intervenção cadastrada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar intervenção!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(true);
    reqGet();
  }, []);

  useEffect(() => {
    if (listaAreaAtuacao.length > 0) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
    listaAreaAtuacao,
    listaPocos,
    listaTarefas,
    listaResponsaveis,
    listaSondas,
  };
}
