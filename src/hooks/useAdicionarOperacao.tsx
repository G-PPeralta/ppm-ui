import { useEffect, useState } from "react";

import { useFormik } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";

import { useToast } from "contexts/Toast";

import { getOperacoes } from "services/get/Estatisticas";
import {
  getAreaAtuacaoList,
  getResponsavelList,
} from "services/get/Infograficos";
import { postOperacoesEstatisticas } from "services/post/OperacoesEstatisticas";

import { useAuth } from "./useAuth";

export function useAdicionarOperacao(
  refresh: boolean,
  setRefresh: Function,
  projeto: any
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [listaOperacao, setListaOperacao] = useState<any[]>([]);
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);

  const reqGet = async () => {
    const operacoes = await getOperacoes();
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsavelList();

    const operacoesSorted = operacoes.data.sort((a: any, b: any) =>
      a.nom_operacao.localeCompare(b.nom_operacao)
    );
    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );

    setListaOperacao(operacoesSorted);
    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
  };

  const initialValues = {
    nom_usu_create: user?.nome,
    id_sonda: projeto.id_sonda,
    id_poco: projeto.id_poco,
    duracao: 0,
    data_inicio: "",
    data_fim: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    // validationSchema: adicionarOperacao,
    onSubmit: async (values) => {
      const newValues = {
        nom_usu_create: user?.nome,
        id_sonda: projeto.id_sonda,
        id_poco: projeto.id_poco,
        duracao: values.duracao,
        data_inicio: values.data_inicio,
        data_fim: values.data_fim,
      };

      setLoading(true);

      try {
        // TODO: liberar endpoint
        // const res = {
        //   status: 200,
        //   data: newValues,
        // };
        // const status = res.status;
        // console.log(">>>values", values);
        // console.log(">>>postOperacoesEstatisticas", newValues);
        const { status } = await postOperacoesEstatisticas(newValues);
        if (status === 200 || status === 201) {
          toast.success("Operação adicionada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
          setRefresh(!refresh);
        }
      } catch (error) {
        toast.error("Erro ao adicionar operação!", {
          id: "toast-principal",
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    reqGet();
  }, [refresh]);

  return {
    registerForm,
    loading,
    listaOperacao,
    listaAreaAtuacao,
    listaResponsaveis,
  };
}
