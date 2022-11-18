import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  Responsavel,
  AreaAtuacao,
  Area,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroAtividadeProjetos } from "validations/Projetos";

import { useToast } from "contexts/Toast";

import { getArea } from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  getResponsavelList,
} from "services/get/Infograficos";
import { getAtividadesRelacaoByProjetoId } from "services/get/Projetos";
import { postCadastroAtividadeProjetos } from "services/post/Projetos";

import { useAuth } from "./useAuth";

export function useCadastroAtividadeProjeto(
  refresh: boolean,
  setRefresh: Function,
  idProjeto?: number
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [listaArea, setListaArea] = useState<Area[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);
  const [listaAtividadesRelacao, setListaAtividadesRelacao] = useState<[]>([]);

  const reqGet = async () => {
    const areas = await getArea();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsavelList();
    const atividadesRelacao = await getAtividadesRelacaoByProjetoId(idProjeto);

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

    const atividadesRelacaoSorted = atividadesRelacao.data.sort(
      (a: any, b: any) => a.valor.localeCompare(b.valor)
    );

    setListaArea(areasSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
    setListaAtividadesRelacao(atividadesRelacaoSorted);
  };

  const initialValues = {
    nom_usu_create: user?.nome,
    id_projeto: 0,
    nom_atividade: "",
    responsavel_id: 0,
    relacao_id: 0,
    dat_inicio_plan: "",
    duracao_plan: 0,
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
    validationSchema: cadastroAtividadeProjetos,
    onSubmit: async (values) => {
      const newDate = new Date(values.dat_inicio_plan);
      newDate.setHours(11);
      const newValues = {
        nom_usu_create: user?.nome,
        id_projeto: values.id_projeto,
        nom_atividade: values.nom_atividade,
        responsavel_id: values.responsavel_id,
        relacao_id: values.relacao_id,
        dat_inicio_plan: newDate,
        duracao_plan: values.duracao_plan - 1,
        nao_iniciar_antes_de: values.nao_iniciar_antes_de,
        nao_terminar_depois_de: values.nao_terminar_depois_de,
        o_mais_breve_possivel: values.o_mais_breve_possivel,
        precedentes: values.precedentes,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroAtividadeProjetos(newValues);

        if (status === 200 || status === 201) {
          toast.success("Atividade cadastrada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
          setRefresh(!refresh);
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
  }, [refresh]);

  // useEffect(() => {
  //   if (refresh) {
  //     reqGet();
  //   }
  // }, [refresh]);

  return {
    registerForm,
    loading,
    listaArea,
    listaAreaAtuacao,
    listaResponsaveis,
    listaAtividadesRelacao,
    reqGet,
  };
}
