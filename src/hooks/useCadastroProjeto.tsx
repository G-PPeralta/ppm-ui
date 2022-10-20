import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { cadastroProjetoSchema } from "validations/Projetos";

import { useToast } from "contexts/Toast";

import {
  getCoordenadores,
  getResponsaveis,
} from "services/get/CadastroModaisInfograficos";
import {
  getClassificacao,
  getComplexidade,
  getDivisao,
  getGate,
  getLocalProjeto,
  getPolo,
  getPrioridade,
  getSolicitante,
  getStatusProjeto,
  getTipoProjeto,
} from "services/get/Projetos";
import { postProject } from "services/post/ProjectRegister";

import { useAuth } from "./useAuth";

export function useProjetos() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [listaResponsaveis, setListaResponsaveis] = useState<any>([]);
  const [listaCoordenadores, setListaCoordenadores] = useState<any>([]);
  const [listaPolos, setListaPolos] = useState<any>([]);
  const [listaLocais, setListaLocais] = useState<any>([]);
  const [listaSolicitantes, setListaSolicitantes] = useState<any>([]);
  const [listaPrioridades, setListaPrioridades] = useState<any>([]);
  const [listaStatus, setListaStatus] = useState<any>([]);
  const [listaComplexidades, setListaComplexidades] = useState<any>([]);
  const [listaDivisoes, setListaDivisoes] = useState<any>([]);
  const [listaClassificacoes, setListaClassificacoes] = useState<any>([]);
  const [listaTipoProjetos, setListaTipoProjetos] = useState<any>([]);
  const [listaGates, setListaGates] = useState<any>([]);

  const refreshState = {
    refresh,
    setRefresh,
  };

  const addOutroFinalArray = (array: any, nomeChave: string) => {
    const outro: any = {
      id: 0,
      [nomeChave]: "Outro",
      deletado: false,
    };

    const arrayComOutroAoFinalArray: any = [...array, outro];

    return arrayComOutroAoFinalArray;
  };

  const reqGet = async () => {
    const responsaveis = await getResponsaveis();
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );
    const responsaveisComOutrosAoFinalArray = addOutroFinalArray(
      responsaveisSorted,
      "nome"
    );
    setListaResponsaveis(responsaveisComOutrosAoFinalArray);

    const coordenadores = await getCoordenadores();
    const coordenadoresSorted = coordenadores.data.sort((a: any, b: any) =>
      a.coordenadorNome.localeCompare(b.coordenadorNome)
    );
    const coordenadoresComOutrosAoFinalArray = addOutroFinalArray(
      coordenadoresSorted,
      "coordenadorNome"
    );
    setListaCoordenadores(coordenadoresComOutrosAoFinalArray);

    const polos = await getPolo();
    const polosSorted = polos.data.sort((a: any, b: any) =>
      a.polo.localeCompare(b.polo)
    );
    const polosComOutrosAoFinalArray = addOutroFinalArray(polosSorted, "polo");
    setListaPolos(polosComOutrosAoFinalArray);

    const locais = await getLocalProjeto();
    const locaisSorted = locais.data.sort((a: any, b: any) =>
      a.local.localeCompare(b.local)
    );
    const locaisComOutrosAoFinalArray = addOutroFinalArray(
      locaisSorted,
      "local"
    );
    setListaLocais(locaisComOutrosAoFinalArray);

    const solicitantes = await getSolicitante();
    const solicitantesSorted = solicitantes.data.sort((a: any, b: any) =>
      a.solicitante.localeCompare(b.solicitante)
    );
    const solicitantesComOutrosAoFinalArray = addOutroFinalArray(
      solicitantesSorted,
      "solicitante"
    );
    setListaSolicitantes(solicitantesComOutrosAoFinalArray);

    const prioridades = await getPrioridade();
    const prioridadesSorted = prioridades.data.sort((a: any, b: any) =>
      a.prioridade.localeCompare(b.prioridade)
    );
    const prioridadesComOutrosAoFinalArray = addOutroFinalArray(
      prioridadesSorted,
      "prioridade"
    );
    setListaPrioridades(prioridadesComOutrosAoFinalArray);

    const status = await getStatusProjeto();
    const statusSorted = status.data.sort((a: any, b: any) =>
      a.status.localeCompare(b.status)
    );
    // console.log(statusSorted);

    // const statusComOutrosAoFinalArray = addOutroFinalArray(
    //   statusSorted,
    //   "status"
    // );
    setListaStatus(statusSorted);

    const complexidades = await getComplexidade();
    const complexidadesSorted = complexidades.data.sort((a: any, b: any) =>
      a.complexidade.localeCompare(b.complexidade)
    );
    // const complexidadesComOutrosAoFinalArray = addOutroFinalArray(
    //   complexidadesSorted,
    //   "complexidade"
    // );
    setListaComplexidades(complexidadesSorted);

    const divisoes = await getDivisao();
    const divisoesSorted = divisoes.data.sort((a: any, b: any) =>
      a.divisao.localeCompare(b.divisao)
    );
    const divisoesComOutrosAoFinalArray = addOutroFinalArray(
      divisoesSorted,
      "divisao"
    );
    setListaDivisoes(divisoesComOutrosAoFinalArray);

    const classificacoes = await getClassificacao();
    const classificacoesSorted = classificacoes.data.sort((a: any, b: any) =>
      a.classificacao.localeCompare(b.classificacao)
    );
    const classificacoesComOutrosAoFinalArray = addOutroFinalArray(
      classificacoesSorted,
      "classificacao"
    );
    setListaClassificacoes(classificacoesComOutrosAoFinalArray);

    const tipoProjetos = await getTipoProjeto();
    const tipoProjetosSorted = tipoProjetos.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    const tipoProjetosComOutrosAoFinalArray = addOutroFinalArray(
      tipoProjetosSorted,
      "tipo"
    );
    setListaTipoProjetos(tipoProjetosComOutrosAoFinalArray);

    const gates = await getGate();
    const gatesSorted = gates.data.sort((a: any, b: any) =>
      a.gate.localeCompare(b.gate)
    );
    const gatesComOutrosAoFinalArray = addOutroFinalArray(gatesSorted, "gate");
    setListaGates(gatesComOutrosAoFinalArray);
  };

  const optionsResponsaveis = listaResponsaveis.map((responsavel: any) => ({
    value: responsavel.id,
    label: responsavel.nome,
  }));

  const optionsCoordenadores = listaCoordenadores.map((responsavel: any) => ({
    value: responsavel.id,
    label: responsavel.coordenadorNome,
  }));

  const optionsPolos = listaPolos.map((polo: any) => ({
    value: polo.id,
    label: polo.polo,
  }));

  const optionsLocais = listaLocais.map((local: any) => ({
    value: local.id,
    label: local.local,
  }));

  const optionsSolicitantes = listaSolicitantes.map((solicitante: any) => ({
    value: solicitante.id,
    label: solicitante.solicitante,
  }));

  const optionsPrioridades = listaPrioridades.map((prioridade: any) => ({
    value: prioridade.id,
    label: prioridade.prioridade,
  }));

  const optionsStatus = listaStatus.map((status: any) => ({
    value: status.id,
    label: status.status,
  }));

  const optionsComplexidades = listaComplexidades.map((complexidade: any) => ({
    value: complexidade.id,
    label: complexidade.complexidade,
  }));

  const optionsDivisoes = listaDivisoes.map((divisao: any) => ({
    value: divisao.id,
    label: divisao.divisao,
  }));

  const optionsClassificacoes = listaClassificacoes.map(
    (classificacao: any) => ({
      value: classificacao.id,
      label: classificacao.classificacao,
    })
  );

  const optionsTipoProjetos = listaTipoProjetos.map((tipoProjeto: any) => ({
    value: tipoProjeto.id,
    label: tipoProjeto.tipo,
  }));

  const optionsGates = listaGates.map((gate: any) => ({
    value: gate.id,
    label: gate.gate,
  }));

  const initialValues: any = {
    nom_usu_create: user?.nome,
    responsavelId: -1,
    coordenadorId: -1,
    poloId: -1,
    localId: -1,
    solicitanteId: -1,
    prioridadeId: 1,
    statusId: -1,
    nomeProjeto: "",
    elementoPep: "",
    dataInicio: "",
    capexPrevisto: 0,
    complexidadeId: -1,
    divisaoId: -1,
    classificacaoId: -1,
    tipoProjetoId: -1,
    gateId: -1,
    descricao: "",
    justificativa: "",
    comentarios: "",
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: cadastroProjetoSchema,
    onSubmit: async (values) => {
      const newValues = {
        prioridadeId: 1, // PRIORIDADE BAIXA COMO PADRÃO (PEDIDO EDU)
        nom_usu_create: user?.nome,
        nomeProjeto: values.nomeProjeto,
        descricao: values.descricao,
        justificativa: values.justificativa,
        dataInicio: values.dataInicio,
        poloId: values.poloId,
        localId: values.localId,
        solicitanteId: values.solicitanteId,
        classificacaoId: values.classificacaoId,
        divisaoId: values.divisaoId,
        gateId: values.gateId,
        tipoProjetoId: values.tipoProjetoId,
        statusId: values.statusId,
        complexidadeId: values.complexidadeId,
        comentarios: values.comentarios,
        responsavelId: values.responsavelId,
        coordenadorId: values.coordenadorId,
        elementoPep: values.elementoPep,
        capexPrevisto: values.capexPrevisto,
      };

      setLoading(false);

      try {
        const { status } = await postProject(newValues);

        if (status === 200 || status === 201) {
          toast.success("Projeto cadastrado com sucesso!", {
            id: "toast-principal",
          });
        }
      } catch (error) {
        toast.error("Erro ao cadastrar projeto!", {
          id: "toast-principal",
        });
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    setLoading(false);
    reqGet();
  }, []);

  useEffect(() => {
    reqGet();
  }, [refresh]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
    refreshState,
    optionsResponsaveis,
    optionsCoordenadores,
    optionsPolos,
    optionsLocais,
    optionsSolicitantes,
    optionsPrioridades,
    optionsStatus,
    optionsComplexidades,
    optionsDivisoes,
    optionsClassificacoes,
    optionsTipoProjetos,
    optionsGates,
  };
}
