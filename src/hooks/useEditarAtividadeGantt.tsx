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
    inicio_planejado: "",
    duracao_dias: 0,
  };

  const adicionarOperacao = yup.object({
    id_atividade: yup.number(),
    inicio_realizado: yup.date(),
    fim_realizado: yup.date(),
    pct_real: yup.number(),
    inicio_planejado: yup.date(),
    duracao_dias: yup.number(),
  });
  const registerForm: any = useFormik({
    initialValues,
    validationSchema: adicionarOperacao,
    onSubmit: async (values) => {
      const id = values.id_atividade;
      const dat_ini = new Date(values.inicio_realizado);
      const dat_fim = new Date(values.fim_realizado);
      const dat_ini_plan = new Date(values.inicio_planejado);
      const newValues = {
        dat_ini_real: dat_ini.toISOString(),
        dat_fim_real: dat_fim.toISOString(),
        dat_ini_plan: dat_ini_plan.toISOString(),
        pct_real: values.pct_real,
        duracao_dias: values.duracao_dias,
      };

      try {
        const { status } = await patchAtividadeProjeto(id, newValues);
        if (status === 200 || status === 201) {
          toast.success("Atividade editada com sucesso!", {
            id: "toast-principal",
          });
          // setLoading(false);
          setRefresh(!refresh);
        }
      } catch (error) {
        toast.error("Erro ao editar atividade!", {
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
      inicio_realizado: args.rowData.StartDate,
      fim_realizado: args.rowData.EndDate,
      // inicio_planejado: new Date(args.rowData.BaselineStartDate),
      // fim_planejado: new Date(args.rowData.BaselineEndDate),
      // hrs_totais: args.rowData.BaselineDuration,
      // hrs_reais: args.rowData.Duration,
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
