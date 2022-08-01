import { useState } from 'react';

import { useFormik } from 'formik';
import { projectRegisterSchema } from 'validations/ProjectRegister';

import { useToast } from 'contexts/Toast';

import { postProject } from 'services/post/ProjectRegister';

export function useProjects() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const projectsForm = useFormik({
    initialValues: {
      nomeProjeto: '',
      descricao: '',
      justificativa: '',
      valorTotalPrevisto: 0,
      classificacaoId: '',
      solicitanteId: '',
      poloId: '',
      dataInicio: '',
      dataFim: '',
      dataInicioReal: '',
      dataFimReal: '',
      prioridadeId: '',
      complexidadeId: '',
      localId: '',
      divisaoId: '',
      statusId: '',
      gateId: '',
      tipoProjetoId: '',
      demandaId: '',
      comentarios: '',
      nomeResponsavel: '',
      tipoResponsavel: '',
    },
    validationSchema: projectRegisterSchema,
    onSubmit: async (values) => {
      const newValues = {
        nomeProjeto: values.nomeProjeto,
        descricao: values.descricao,
        valorTotalPrevisto: Number(values.valorTotalPrevisto),
        classificacaoId: values.classificacaoId,
        solicitanteId: values.solicitanteId,
        justificativa: values.justificativa,
        poloId: values.poloId,
        dataInicio: values.dataInicio,
        dataFim: values.dataFim,
        dataInicioReal: values.dataInicioReal,
        dataFimReal: values.dataFimReal,
        prioridadeId: values.prioridadeId,
        complexidadeId: values.complexidadeId,
        localId: values.localId,
        divisaoId: values.divisaoId,
        statusId: values.statusId,
        gateId: values.gateId,
        tipoProjetoId: values.tipoProjetoId,
        demandaId: values.demandaId,
        comentarios: values.comentarios,
        nomeResponsavel: values.nomeResponsavel,
        tipoResponsavel: values.tipoResponsavel,
      };

      setLoading(true);

      try {
        const { status } = await postProject(newValues);

        if (status === 200 || status === 201) {
          toast.success('Projeto cadastrado com sucesso!', {
            id: 'toast-principal',
          });
        }
      } catch (error) {
        toast.error('Erro ao cadastrar projeto!', {
          id: 'toast-principal',
        });
      }

      setLoading(false);
    },
  });

  return {
    projectsForm,
    loading,
  };
}
