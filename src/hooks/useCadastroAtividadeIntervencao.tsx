import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  Responsavel,
  AreaAtuacao,
  Area,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroAtividadeIntervencaoSchema } from "validations/ModaisCadastrosInfografico";

import { addOutroFinalArray } from "utils/AdicionaOpcaoOutroAoFinalArray";

import { useToast } from "contexts/Toast";

import { getArea } from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  getNovaAtividadesTarefas,
  getResponsavelList,
} from "services/get/Infograficos";
import { postCadastroAtividadeIntervencao } from "services/post/Infograficos";

import { useAuth } from "./useAuth";

export function useCadastroAtividadeIntervencao() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [listaArea, setListaArea] = useState<Area[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaAtividades, setListaAtividades] = useState<any[]>([]);
  // const [listaTarefa, setListaTarefa] = useState<Tarefa[]>([]);
  const [refresh, setRefresh] = useState(false);

  const hookRefreshState = {
    refresh,
    setRefresh,
  };

  const reqGet = async () => {
    const areas = await getArea();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsavelList();
    const atividades = await getNovaAtividadesTarefas();

    const arrayAreas = areas.data.map(({ id, nom_area }: any) => ({
      id,
      nom_area,
    }));
    const areasSorted = arrayAreas.sort((a: any, b: any) =>
      a.nom_area.localeCompare(b.nom_area)
    );

    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );

    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );

    const atividadesSorted = atividades.data.sort((a, b) =>
      a.nom_atividade.localeCompare(b.nom_atividade)
    );
    const atividadesComOutrosAoFinalArray = addOutroFinalArray(
      atividadesSorted,
      "nom_atividade"
    );

    setListaArea(areasSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaAtividades(atividadesComOutrosAoFinalArray);
  };

  const listaAtividadesPrecedentes = listaAtividades.map((atividade) => ({
    id: atividade.id,
    nome: atividade.tarefa,
    checked: false,
  }));

  const initialValues = {
    nom_usu_create: user?.nome,
    id_intervencao: 0,
    id_origem: "",
    nom_atividade: "",
    responsavel_id: 0,
    area_atuacao: 0,
    duracao: 0,
    atividade_id: -1,
    nao_iniciar_antes_de: {
      data: "",
      checked: false,
    },
    nao_terminar_depois_de: {
      data: "",
      checked: false,
    },
    o_mais_breve_possivel: false,
    precedentes: [
      {
        atividadePrecedenteId: 0,
        dias: 0,
      },
    ],
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroAtividadeIntervencaoSchema,
    onSubmit: async (values) => {
      const id_intervencao = Number(values.id_intervencao);
      const newValues = {
        nom_usu_create: user?.nome,
        // id_origem: values.id_origem,
        // nom_atividade: values.nom_atividade,
        atividade_id: values.atividade_id,
        responsavel_id: values.responsavel_id,
        area_atuacao: values.area_atuacao,
        nao_iniciar_antes_de: values.nao_iniciar_antes_de,
        nao_terminar_depois_de: values.nao_terminar_depois_de,
        o_mais_breve_possivel: values.o_mais_breve_possivel,
        precedentes: values.precedentes,
        duracao: values.duracao,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroAtividadeIntervencao(
          id_intervencao,
          newValues
        );

        if (status === 200 || status === 201) {
          toast.success("Atividade cadastrada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar atividade!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    reqGet();
  }, []);

  useEffect(() => {
    reqGet();
  }, [refresh]);

  return {
    registerForm,
    loading,
    listaArea,
    listaAreaAtuacao,
    listaResponsaveis,
    listaAtividades,
    listaAtividadesPrecedentes,
    hookRefreshState,
  };
}
