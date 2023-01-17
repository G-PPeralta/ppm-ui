// CRIADO EM: 08/10/2022
// AUTOR: Max
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de uma nova atividade.

import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  Responsavel,
  AreaAtuacao,
  Area,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroAtividadeSchema } from "validations/ModaisCadastrosInfografico";

import { useToast } from "contexts/Toast";

import { getArea } from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  getResponsavelList,
} from "services/get/Infograficos";
import { postCadastroAtividade } from "services/post/Infograficos";

import { useAuth } from "./useAuth";

export function useServicoFerramentaAtividade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [listaArea, setListaArea] = useState<Area[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);

  const reqGet = async () => {
    const areas = await getArea();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsavelList();

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

    setListaArea(areasSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
  };

  const initialValues = {
    nom_usu_create: user?.nome,
    id_origem: "",
    nom_atividade: "",
    responsavel_id: 0,
    area_atuacao: "",
    nao_iniciar_antes_de: {
      data: "",
      checked: false,
    },
    nao_terminar_depois_de: {
      data: "",
      checked: false,
    },
    o_mais_breve_possivel: false,
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroAtividadeSchema,
    onSubmit: async (values) => {
      const newValues = {
        nom_usu_create: user?.nome,
        id_origem: values.id_origem,
        nom_atividade: values.nom_atividade,
        responsavel_id: values.responsavel_id,
        area_atuacao: values.area_atuacao,
        nao_iniciar_antes_de: values.nao_iniciar_antes_de,
        nao_terminar_depois_de: values.nao_terminar_depois_de,
        o_mais_breve_possivel: values.o_mais_breve_possivel,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroAtividade(newValues);

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

  return {
    registerForm,
    loading,
    listaArea,
    listaAreaAtuacao,
    listaResponsaveis,
  };
}
