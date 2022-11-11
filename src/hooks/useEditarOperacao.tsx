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
import { uploadArquivo } from "services/post/Upload";
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
    pct_real: 0,
    nome_atividade: "",
    hrs_reais: 0,
    anotacoes: "",
    mocs: [
      {
        numero_moc: "",
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
      const newValues = {
        nom_usu_create: user?.nome,
        id_poco_pai: projeto.id_poco,
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
        const { status } = await patchOperacoesEstatisticas(newValues);
        values.mocs.map(async (moc: any) => {
          if (moc.anexo) {
            const formData = new FormData();
            formData.append("files", moc.arquivo);

            await uploadArquivo(formData);
          }
        });
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
