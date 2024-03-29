// CRIADO EM: 21/09/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de uma nova priorização - módulo Configuração - Priorização.

import { useState, useEffect } from "react";

import { useFormik } from "formik";
import { Ranking } from "interfaces/Ranking";
import { cadastroNovaPriorizacaoSchema } from "validations/ModaisRanking";

import { useToast } from "contexts/Toast";

import { getProjetosRanking } from "services/get/Projetos-Ranking";
import { postProject } from "services/post/Priorizacao";

import { useAuth } from "./useAuth";

export function useCadastroPriorizacao(id_projeto: number = 0) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [listaBeneficios, setListaBeneficios] = useState<any[]>([]);
  const [listaOperacao, setListaOperacao] = useState<any[]>([]);
  const [listaEstrategia, setListaEstrategia] = useState<any[]>([]);
  // const [listaComplexidade, setComplexidade] = useState<any[]>([]);
  const [listaPrioridade, setPrioridade] = useState<any[]>([]);
  const [listaRegulatorio, setRegulatorio] = useState<any[]>([]);
  const [ranking, setRanking] = useState<Ranking[]>();

  const reqGet = async () => {
    const priorizacao = await getProjetosRanking();
    // const data = await getRanking(id_projeto);
    setRanking([]);

    const beneficiosSorted = priorizacao.data.Benefício.sort((a: any, b: any) =>
      a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const operacaoSorted = priorizacao.data.Operação.sort((a: any, b: any) =>
      a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const estrategiaSorted = priorizacao.data["Estratégia para o Negócio"].sort(
      (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    );

    // const complexidadeSorted = priorizacao.data.Complexidade.sort(
    //   (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    // );

    const prioridadeSorted = priorizacao.data.Prioridade.sort(
      (a: any, b: any) => {
        if (a.nom_opcao === "Alto" && b.nom_opcao === "Médio") {
          return -1;
        }
        if (a.nom_opcao === "Alto" && b.nom_opcao === "Baixo") {
          return -1;
        }
        if (a.nom_opcao === "Médio" && b.nom_opcao === "Alto") {
          return 1;
        }
        if (a.nom_opcao === "Médio" && b.nom_opcao === "Baixo") {
          return -1;
        }
        if (a.nom_opcao === "Baixo" && b.nom_opcao === "Alto") {
          return 1;
        }
        if (a.nom_opcao === "Baixo" && b.nom_opcao === "Médio") {
          return 1;
        } else {
          return 0;
        }
      }
    );

    const regulatorioSorted = priorizacao.data.Regulatório.sort(
      (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    );

    // setComplexidade(complexidadeSorted);
    setListaEstrategia(estrategiaSorted);
    setListaOperacao(operacaoSorted);
    setListaBeneficios(beneficiosSorted);
    setPrioridade(prioridadeSorted);
    setRegulatorio(regulatorioSorted);
  };

  const initialValues: any = {
    id_projeto: 0,
    beneficio: {
      opcao_id: "",
      id_ranking: 0,
    },
    regulatorio: {
      opcao_id: "",
      id_ranking: 0,
    },
    operacao: {
      opcao_id: "",
      id_ranking: 0,
    },
    prioridade: {
      opcao_id: "",
      id_ranking: 0,
    },
    // complexidade: {
    //   opcao_id: "",
    //   id_ranking: 0,
    // },
    estrategia: {
      opcao_id: "",
      id_ranking: 0,
    },
    dsc_comentario: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaPriorizacaoSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        id_projeto: values.id_projeto,
        beneficio: values.beneficio,
        regulatorio: values.regulatorio,
        operacao: values.operacao,
        prioridade: values.prioridade,
        // complexidade: values.complexidade,
        estrategia: values.estrategia,
        dsc_comentario: "",
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postProject(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Priorização cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar a priorização!`, {
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
    if (listaBeneficios.length > 0) {
      setLoading(false);
    }
  }, [listaBeneficios]);

  return {
    registerForm,
    loading,
    listaBeneficios,
    listaOperacao,
    listaEstrategia,
    // listaComplexidade,
    listaPrioridade,
    listaRegulatorio,
    ranking,
  };
}
// Como pegar os valores
// id_projeto: number; -- item que foi clicado na tela (o botão de ação)
//   id_ranking: number; -- beneficio por exemxplo, complexidade, etc
//   id_opcao: number; -- opção dentro do ranking
//   dsc_comentario: string; -- comentario
//   nom_usu_create: string; -- pegar nome do usuario
