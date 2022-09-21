import { useState, useEffect } from "react";

import { useFormik } from "formik";
import { cadastroNovaPriorizacaoSchema } from "validations/ProjectRankings";

import { useToast } from "contexts/Toast";

import { getProjetosRanking } from "services/get/Projetos-Ranking";
import { postNovaSonda } from "services/post/CadastroModaisInfograficos";

import { useAuth } from "./useAuth";

export function useCadastroPriorizacao() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [listaBeneficios, setListaBeneficios] = useState<any[]>([]);
  const [listaOperacao, setListaOperacao] = useState<any[]>([]);
  const [listaEstrategia, setListaEstrategia] = useState<any[]>([]);
  const [listaComplexidade, setComplexidade] = useState<any[]>([]);
  const [listaPrioridade, setPrioridade] = useState<any[]>([]);
  const [listaRegulatorio, setRegulatorio] = useState<any[]>([]);

  const reqGet = async () => {
    const priorizacao = await getProjetosRanking();

    const beneficiosSorted = priorizacao.data.Benefício.sort((a: any, b: any) =>
      a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const operacaoSorted = priorizacao.data.Operação.sort((a: any, b: any) =>
      a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const estrategiaSorted = priorizacao.data["Estratégia para o Negócio"].sort(
      (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const complexidadeSorted = priorizacao.data.Complexidade.sort(
      (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const prioridadeSorted = priorizacao.data.Prioridade.sort(
      (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    );

    const regulatorioSorted = priorizacao.data.Regulatório.sort(
      (a: any, b: any) => a.nom_opcao.localeCompare(b.nom_opcao)
    );

    setComplexidade(complexidadeSorted);
    setListaEstrategia(estrategiaSorted);
    setListaOperacao(operacaoSorted);
    setListaBeneficios(beneficiosSorted);
    setPrioridade(prioridadeSorted);
    setRegulatorio(regulatorioSorted);
  };

  const initialValues: any = {
    beneficio: "",
    regulatorio: "",
    operacao: "",
    prioridade: "",
    complexidade: "",
    estrategia: "",
    nom_usu_create: user?.nome,
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema: cadastroNovaPriorizacaoSchema,
    onSubmit: async (values) => {
      const newValues: any = {
        beneficio: values.beneficio,
        regulatorio: values.regulatorio,
        operacao: values.operacao,
        prioridade: values.prioridade,
        complexidade: values.complexidade,
        estrategia: values.estrategia,
        nom_usu_create: user?.nome,
      };

      setLoading(true);

      try {
        const { status } = await postNovaSonda(newValues);

        if (status === 200 || status === 201) {
          toast.success(`Sonda ${values.sonda} cadastrada com sucesso!`, {
            id: "toast-principal",
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(`Erro ao cadastrar sonda ${values.sonda}!`, {
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
    listaComplexidade,
    listaPrioridade,
    listaRegulatorio,
  };
}
