import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  Responsavel,
  AreaAtuacao,
  Area,
} from "interfaces/CadastrosModaisInfograficos";
import { cadastroOperacaoSchema } from "validations/Estatisticas";

import { useToast } from "contexts/Toast";

import { getArea } from "services/get/CadastroModaisInfograficos";
import {
  getAreaAtuacaoList,
  getResponsavelList,
} from "services/get/Infograficos";
import { postCadastroOperacao } from "services/post/Estatistica";

import { useAuth } from "./useAuth";

export function useCadastroOperacao() {
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
    nom_operacao: "",
    responsavel_id: 0,
    area_id: 0,
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
    validationSchema: cadastroOperacaoSchema,
    onSubmit: async (values) => {
      const newValues = {
        nom_usu_create: user?.nome,
        id_origem: values.id_origem,
        nom_operacao: values.nom_operacao,
        responsavel_id: values.responsavel_id,
        area_id: values.area_id,
        nao_iniciar_antes_de: values.nao_iniciar_antes_de,
        nao_terminar_depois_de: values.nao_terminar_depois_de,
        o_mais_breve_possivel: values.o_mais_breve_possivel,
      };

      setLoading(true);

      try {
        const { status } = await postCadastroOperacao(newValues);

        if (status === 200 || status === 201) {
          toast.success("Operação cadastrada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error("Erro ao cadastrar operação!", {
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
