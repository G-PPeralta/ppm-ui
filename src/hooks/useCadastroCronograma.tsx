import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  AreaAtuacao,
  ListaPoco,
  Responsavel,
  Tarefas,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroNovoCronogramaSchema } from "validations/Estatisticas";

import { useToast } from "contexts/Toast";

import {
  getPocos,
  getResponsaveis,
  getTarefas,
} from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  postGetInfoCampanha,
  getSondaCampanha,
} from "services/get/Infograficos";
import { postNovaIntervencao } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroCronograma() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaSondas, setListaSondas] = useState<any[]>([]);
  const [listaPocos, setListaPocos] = useState<ListaPoco[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaSondaCampanha, setListaSondaCampanha] = useState<any[]>([]);
  const [listaTarefas, setListaTarefas] = useState<Tarefas[]>([]);

  const getAllCampanha = {
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
    const campanha = await postGetInfoCampanha(getAllCampanha);
    const pocos = await getPocos();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsaveis();
    const sondaCampanha = await getSondaCampanha();
    const tarefas = await getTarefas();

    const arraySondas = campanha.data.map(({ sonda, id_campanha }: any) => ({
      sonda,
      id_campanha,
    }));
    const sondasSorted = arraySondas.sort((a: any, b: any) =>
      a.sonda.localeCompare(b.sonda)
    );
    const pocosSorted = pocos.data.sort((a: ListaPoco, b: ListaPoco) =>
      a.poco.localeCompare(b.poco)
    );
    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );

    const sondaCampanhaSorted = sondaCampanha.data.sort((a: any, b: any) =>
      a.nom_campanha.localeCompare(b.nom_campanha)
    );
    const tarefasSorted = tarefas.data.sort((a: Tarefas, b: Tarefas) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );

    setListaSondas(sondasSorted);
    setListaPocos(pocosSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaSondaCampanha(sondaCampanhaSorted);
    setListaTarefas(tarefasSorted);
  };

  const listaAtividadesPrecedentes = listaTarefas.map((atividade) => ({
    id: atividade.id,
    nome: atividade.nom_atividade,
    checked: false,
  }));

  const initialValues: any = {
    nom_usu_create: user?.nome,
    sonda_id: 0,
    poco_id: 0,
    atividades: [
      {
        area_id: 0,
        operacao_id: 0,
        responsavel_id: 0,
        data_inicio: "",
        duracao: 0,
        precedentes: [
          {
            id: 0,
            nome: "",
            checked: false,
          },
        ],
      },
    ],
    comentarios: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroNovoCronogramaSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        nom_usu_create: user?.nome,
        sonda_id: values.sonda_id,
        poco_id: values.poco_id,
        atividades: values.atividades,
        comentarios: values.comentarios,
      };

      setLoading(true);

      try {
        const { status } = await postNovaIntervencao(newValues);

        if (status === 200 || status === 201) {
          toast.success("Cronograma cadastrado com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar cronograma!", {
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
    if (listaSondas.length > 0 && listaPocos.length > 0) {
      setLoading(false);
    }
  }, [listaSondas, listaPocos]);

  return {
    registerForm,
    loading,
    listaSondas,
    listaPocos,
    listaAreaAtuacao,
    listaResponsaveis,
    listaSondaCampanha,
    listaTarefas,
    listaAtividadesPrecedentes,
  };
}
