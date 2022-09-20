import { useState } from "react";

import { useFormik } from "formik";
import { projectRegisterSchema } from "validations/ProjectRegister";

import { useToast } from "contexts/Toast";

import { postProject } from "services/post/ProjectRegister";
import { getProjects } from "services/get/GetProject";

export function useProjects() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const getAllProjects = async (polo: string) => {
    const data: any[] = await getProjects(polo);
    return data;
  };

  const projectsForm = useFormik({
    initialValues: {
      nomeProjeto: "",
      descricao: "",
      justificativa: "",
      valorTotalPrevisto: 0,
      classificacaoId: 0,
      solicitanteId: 0,
      poloId: 0,
      dataInicio: "",
      dataFim: "",
      dataInicioReal: "",
      dataFimReal: "",
      prioridadeId: 0,
      complexidadeId: 0,
      localId: 0,
      divisaoId: 0,
      statusId: 0,
      gateId: 0,
      tipoProjetoId: 0,
      demandaId: 0,
      comentarios: "",
      responsavel: "",
      coordenador: "",
      responsavel_id: 0,
      coordenador_id: 0,
      elemento_pep: "",
    },

    validationSchema: projectRegisterSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomeProjeto: values.nomeProjeto,
        descricao: values.descricao,
        valorTotalPrevisto: Number(values.valorTotalPrevisto),
        classificacaoId: Number(values.classificacaoId),
        solicitanteId: Number(values.solicitanteId),
        justificativa: values.justificativa,
        poloId: Number(values.poloId),
        dataInicio: values.dataInicio,
        dataFim: values.dataFim,
        dataInicioReal: values.dataInicioReal,
        dataFimReal: values.dataFimReal,
        prioridadeId: Number(values.prioridadeId),
        complexidadeId: Number(values.complexidadeId),
        localId: Number(values.localId),
        divisaoId: Number(values.divisaoId),
        statusId: Number(values.statusId),
        gateId: Number(values.statusId),
        tipoProjetoId: Number(values.tipoProjetoId),
        // demandaId: Number(values.demandaId),
        comentarios: values.comentarios,
        responsavel_id: values.responsavel_id,
        coordenador_id: values.coordenador_id,
        elemento_pep: values.elemento_pep,
      };

      setLoading(true);

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

  return {
    getAllProjects,
    projectsForm,
    loading,
  };
}
