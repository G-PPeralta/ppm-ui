import { useEffect, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";
import * as yup from "yup";

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
    // id_area: 0,
    inicio_realizado: "",
    fim_realizado: "",
    inicio_planejado: "",
    fim_planejado: "",
    pct_real: 0,
    // id_responsavel: 0,
  };

  const adicionarOperacao = yup.object({
    id_atividade: yup.number().required("Campo obrigatório").moreThan(0),
    // id_area: yup.number(), // .required("Campo obrigatório").moreThan(0),
    inicio_realizado: yup.date().required("Campo obrigatório"),
    fim_realizado: yup.date().required("Campo obrigatório"),
    inicio_planejado: yup.date().required("Campo obrigatório"),
    fim_planejado: yup.date().required("Campo obrigatório"),
    // hrs_totais: yup.number().required("Campo obrigatório").moreThan(0),
    pct_real: yup.number().required("Campo obrigatório"),
    // id_responsavel: yup.number(), // .required("Campo obrigatório").moreThan(0),
    // precedentes: yup.array().of(
    //   yup.object({
    //     atividadePrecedenteId: yup.number(),
    //     dias: yup.number(),
    //   })
    // ),
  });
  const registerForm: any = useFormik({
    initialValues,
    validationSchema: adicionarOperacao,
    onSubmit: async (values) => {
      const newValues = {
        id_atividade: values.id_atividade,

        inicio_realizado: new Date(values.inicio_realizado).toLocaleString(),
        fim_realizado: new Date(values.fim_realizado).toLocaleString(), // tratamento back
        inicio_planejado: new Date(values.inicio_planejado).toLocaleString(),
        fim_planejado: new Date(values.fim_planejado).toLocaleString(), // tratamento back

        pct_real: values.pct_real,
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
