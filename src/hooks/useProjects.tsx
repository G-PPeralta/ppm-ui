// CRIADO EM: 23/06/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Hook com funções para o cadastro de Projetos - módulo de Projetos.

import { useState } from "react";

import { useFormik } from "formik";
import { Projetos } from "interfaces/Projetos";

import { useToast } from "contexts/Toast";

import { getProjetos } from "services/get/GetProject";
import { postProject } from "services/post/ProjectRegister";

export function useProjects() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const getProjetosDetalhados = async () => {
    const data: Projetos[] = await getProjetos();
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
      comentarios: "",
      responsavel: "",
      coordenador: "",
      responsavel_id: 0,
      coordenador_id: 0,
      elemento_pep: "",
    },

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
    getProjetosDetalhados,
    projectsForm,
    loading,
  };
}
