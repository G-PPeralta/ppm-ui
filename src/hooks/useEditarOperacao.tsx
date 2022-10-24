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

export function useEditarOperacao(
  refresh: boolean,
  setRefresh: Function,
  projeto: any
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    id_atividade: 0,
    inicio_realizado: "",
    fim_realizado: "",
    inicio_planejado: "",
    fim_planejado: "",
    pct_real: 0,
    nome_atividade: "",
    hrs_reais: 0,
    anotacoes: "",
    mocs: [
      {
        numero_moc: "",
      },
    ],
    ocorrencias: [
      {
        id: 0,
        nome_ocorrencia: "",
        horas: "",
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
      const newValues = {
        nom_usu_create: user?.nome,
        geral: {
          id_atividade: values.id_atividade,
          nome_atividade: values.nome_atividade,
          pct_real: values.pct_real,
          hrs_reais: values.hrs_reais,
          inicio_realizado: values.inicio_realizado,
          fim_realizado: values.fim_realizado,
          inicio_planejado: values.inicio_planejado,
          fim_planejado: values.fim_planejado,
        },
        anotacoes: {
          anotacoes: values.anotacoes,
        },
        mocs: values.mocs,
      };

      setLoading(true);

      try {
        // TODO: liberar endpoint
        // const res = {
        //   status: 200,
        //   data: newValues,
        // };
        // const status = res.status;
        // console.log(">>>>", newValues);
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
  }, [refresh, projeto]);

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
