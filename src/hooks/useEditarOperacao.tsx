// CRIADO EM: 12/10/2022
// AUTOR: Magno
// DESCRIÇÃO DO ARQUIVO: Hook com funções para a edição de uma operação no Gantt de Cronograma - módulo Intervenções - Cronograma.

import { useEffect, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";
import { editarAtividadeGanttSchema } from "validations/Estatisticas";

import { useToast } from "contexts/Toast";

import {
  getAreaAtuacaoList,
  getResponsavelList,
} from "services/get/Infograficos";
import { patchOperacoesEstatisticas } from "services/update/OperacoesEstatisticas";

import { useAuth } from "./useAuth";

interface Projeto {
  sonda: string;
  id_sonda: number;
  poco: string;
  id_poco: number;
}

export function useEditarOperacao(
  refresh: boolean,
  setRefresh: Function,
  projeto: Projeto,
  idAtividade?: number
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);

  const reqGet = async () => {
    const areaAtuacao = await getAreaAtuacaoList();
    const responsaveis = await getResponsavelList();

    const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
      a.tipo.localeCompare(b.tipo)
    );
    const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
      a.nome.localeCompare(b.nome)
    );

    setListaAreaAtuacao(areasAtuacaoSorted);
    setListaResponsaveis(responsaveisSorted);
  };

  const initialValues = {
    nom_usu_create: user?.nome,
    id_poco_pai: projeto.id_poco,
    id_atividade: 0,
    inicio_realizado: "",
    fim_realizado: "",
    inicio_planejado: "",
    fim_planejado: "",
    inicio_real: "",
    fim_real: "",
    pct_real: 0,
    flag: 0,
    nome_atividade: "",
    hrs_reais: 0,
    hrs_totais: 0,
    anotacoes: "",
    realEditado: 0,
    mocs: [
      {
        numero_moc: "",
        anexo: "",
        url: "",
        isOpen: false,
      },
    ],
    aprs: [
      {
        codigo_apr: "",
        anexo: "",
        url: "",
        isOpen: false,
      },
    ],
    ocorrencias: [
      {
        id: 0,
        nome_ocorrencia: "",
        horas: "",
        anexo: "",
        url: "",
        isOpen: false,
      },
    ],
    licoes_aprendidas: [
      {
        id: 0,
        licao_aprendida: "",
        data: "",
        acao_e_recomendacao: "",
      },
    ],
  };

  const registerForm: any = useFormik({
    initialValues,
    validationSchema: editarAtividadeGanttSchema,
    onSubmit: async (values) => {
      /*
      Correção bug timezone
      */
      const dat_ini_plan: any = new Date(
        registerForm.values.inicio_planejado.getTime() - 3 * 60 * 60 * 1000
      );
      const dat_ini_real: any = new Date(
        registerForm.values.inicio_realizado.getTime() - 3 * 60 * 60 * 1000
      );
      const newValues = {
        nom_usu_create: user?.nome,
        id_poco_pai: projeto.id_poco,
        geral: {
          id_atividade: values.id_atividade,
          nome_atividade: values.nome_atividade,
          pct_real: values.pct_real,
          hrs_reais: Number(values.hrs_reais),
          hrs_totais: Number(values.hrs_totais),
          inicio_realizado: dat_ini_real,
          fim_realizado: values.fim_realizado,
          inicio_planejado: dat_ini_plan,
          fim_planejado: values.fim_planejado,
          inicio_real: values.inicio_real,
          fim_real: values.fim_real,
          flag: values.flag,
          realEditado: values.realEditado,
        },
        anotacoes: {
          anotacoes: values.anotacoes,
        },
        mocs: values.mocs,
        aprs: values.aprs,
      };

      setLoading(true);

      try {
        const { status } = await patchOperacoesEstatisticas(newValues);
        if (status === 200 || status === 201) {
          toast.success("Operação editada com sucesso!", {
            id: "toast-principal",
          });
          setLoading(false);
          setRefresh(!refresh);
        }
      } catch (error) {
        toast.error("Erro ao editar operação!", {
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
  }, [refresh, projeto]);

  useEffect(() => {
    if (listaResponsaveis.length > 0 && listaResponsaveis.length > 0) {
      setLoading(false);
    }
  }, [listaResponsaveis, listaResponsaveis]);

  return {
    registerForm,
    loading,
    listaAreaAtuacao,
    listaResponsaveis,
    onOpen,
    isOpen,
    onClose,
  };
}
