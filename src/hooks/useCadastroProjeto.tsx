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

  const reqGet = async () => {
    const responsaveis = await getResponsaveis();
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );
    setListaResponsaveis(responsaveisSorted);

    const coordenadores = await getCoordenadores();
    const coordenadoresSorted = coordenadores.data.sort((a: any, b: any) =>
      a.coordenadorNome.localeCompare(b.coordenadorNome)
    );
    setListaCoordenadores(coordenadoresSorted);

    const polos = await getPolo();
    const polosSorted = polos.data.sort((a: any, b: any) =>
      a.polo.localeCompare(b.polo)
    );
    setListaPolos(polosSorted);

    const locais = await getLocalProjeto();
    const locaisSorted = locais.data.sort((a: any, b: any) =>
      a.local.localeCompare(b.local)
    );
    setListaLocais(locaisSorted);

    const solicitantes = await getSolicitante();
    const solicitantesSorted = solicitantes.data.sort((a: any, b: any) =>
      a.solicitante.localeCompare(b.solicitante)
    );
    setListaSolicitantes(solicitantesSorted);

    const prioridades = await getPrioridade();
    const prioridadesSorted = prioridades.data.sort((a: any, b: any) =>
      a.prioridade.localeCompare(b.prioridade)
    );
    setListaPrioridades(prioridadesSorted);

    const status = await getStatusProjeto();
    const statusSorted = status.data.sort((a: any, b: any) =>
      a.status.localeCompare(b.status)
    );
    setListaStatus(statusSorted);

    const complexidades = await getComplexidade();
    const complexidadesSorted = complexidades.data.sort((a: any, b: any) =>
      a.complexidade.localeCompare(b.complexidade)
    );
    setListaComplexidades(complexidadesSorted);

    const divisoes = await getDivisao();
    const divisoesSorted = divisoes.data.sort((a: any, b: any) =>
      a.divisao.localeCompare(b.divisao)
    );
    setListaDivisoes(divisoesSorted);

    const classificacoes = await getClassificacao();
    const classificacoesSorted = classificacoes.data.sort((a: any, b: any) =>
      a.classificacao.localeCompare(b.classificacao)
    );
    setListaClassificacoes(classificacoesSorted);

    const tipoProjetos = await getTipoProjeto();
    const tipoProjetosSorted = tipoProjetos.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    setListaTipoProjetos(tipoProjetosSorted);

    const gates = await getGate();
    const gatesSorted = gates.data.sort((a: any, b: any) =>
      a.gate.localeCompare(b.gate)
    );
    setListaGates(gatesSorted);
  };

  const optionsResponsaveis = listaResponsaveis.map((responsavel: any) => ({
    value: responsavel.id,
    label: responsavel.nome,
  }));

  const optionsCoordenadores = listaCoordenadores.map((responsavel: any) => ({
    value: responsavel.id_coordenador,
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
    responsavelId: 0,
    coordenadorId: 0,
    poloId: 0,
    localId: 0,
    solicitanteId: 0,
    prioridadeId: 1,
    statusId: 0,
    nomeProjeto: "",
    elementoPep: "",
    dataInicio: "",
    capexPrevisto: 0,
    complexidadeId: 0,
    divisaoId: 0,
    classificacaoId: 0,
    tipoProjetoId: 0,
    gateId: 0,
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
    if (loading) {
      setLoading(false);
    }
  }, []);

  return {
    registerForm,
    loading,
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
