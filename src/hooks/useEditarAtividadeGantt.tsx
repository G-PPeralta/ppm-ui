import { useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
// import {
//   AreaAtuacao,
//   Responsavel,
// } from "interfaces/CadastrosModaisInfograficos";
import * as yup from "yup";

import { useToast } from "contexts/Toast";

// import {
//   getAreaAtuacaoList,
//   getResponsavelList,
// } from "services/get/Infograficos";
import { patchAtividadeProjeto } from "services/update/Projeto";

import { useAuth } from "./useAuth";

export function useEditarAtividadeGantt() {
  // refresh: boolean,
  // setRefresh: Function,
  // atividade: any
  const { user } = useAuth();
  const { toast } = useToast();
  const [refresh, setRefresh] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [editAtividade, setEditAtividade] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [listaAreaAtuacao, setListaAreaAtuacao] = useState<AreaAtuacao[]>([]);
  // const [listaResponsaveis, setListaResponsaveis] = useState<Responsavel[]>([]);

  // const reqGet = async () => {
  //   const areaAtuacao = await getAreaAtuacaoList();
  //   const responsaveis = await getResponsavelList();

  //   const areasAtuacaoSorted = areaAtuacao.data.sort((a: any, b: any) =>
  //     a.tipo.localeCompare(b.tipo)
  //   );
  //   const responsaveisSorted = responsaveis.data.sort((a: any, b: any) =>
  //     a.nome.localeCompare(b.nome)
  //   );

  //   setListaAreaAtuacao(areasAtuacaoSorted);
  //   setListaResponsaveis(responsaveisSorted);
  // };

  const initialValues = {
    nom_usu_create: user?.nome,
    id_atividade: 0,
    inicio_realizado: "",
    fim_realizado: "",
    pct_real: 0,
  };

  const adicionarOperacao = yup.object({
    id_atividade: yup.number().required("Campo obrigatório").moreThan(0),
    inicio_realizado: yup.date().required("Campo obrigatório"),
    fim_realizado: yup.date().required("Campo obrigatório"),
    pct_real: yup.number(), // .required("Campo obrigatório").moreThan(0),
  });
  const registerForm: any = useFormik({
    initialValues,
    validationSchema: adicionarOperacao,
    onSubmit: async (values) => {
      const id = values.id_atividade;
      const newValues = {
        dat_ini: new Date(values.inicio_realizado).toLocaleString(),
        dat_fim: new Date(values.fim_realizado).toLocaleString(),
        pct_real: values.pct_real,
      };

      try {
        const { status } = await patchAtividadeProjeto(id, newValues);
        if (status === 200 || status === 201) {
          toast.success("Operação adicionada com sucesso!", {
            id: "toast-principal",
          });
          // setLoading(false);
          setRefresh(!refresh);
        }
      } catch (error) {
        toast.error("Erro ao adicionar operação!", {
          id: "toast-principal",
        });
        // setLoading(false);
      }
    },
  });

  const cellEdit = (args: any) => {
    setEditAtividade({
      id_atividade: args.rowData.TaskID,
      nome_atividade: args.rowData.TaskName,
      inicio_realizado: new Date(args.rowData.StartDate),
      // hrs_totais: args.rowData.BaselineDuration,
      // hrs_reais: args.rowData.Duration,
      fim_realizado: new Date(args.rowData.EndDate),
      pct_real: args.rowData.Progress,
    });
    onOpen();
    args.cancel = true;
  };

  // useEffect(() => {
  //   // reqGet();
  // }, [atividade]);

  return {
    registerForm,
    refresh,
    // loading,
    // listaAreaAtuacao,
    // listaResponsaveis,
    editAtividade,
    setEditAtividade,
    cellEdit,
    isOpen,
    onClose,
  };
}
