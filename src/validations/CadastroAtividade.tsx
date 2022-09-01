import * as yup from 'yup';

export const cadastroAtividadeSchema = yup.object({
  nomeId: yup.string().required('O ID da atividade é obrigatório!'),
  nomeAtividade: yup.string().required('O nome da atividade é obrigatório!'),
  responsavel: yup.string().required('O responsável é obrigatório!'),
  area: yup.string().required('A área é obrigatória!'),
  precedente: yup.array().of(
    yup.object({
      id: yup.string().required('O ID da atividade é obrigatório!'),
      tarefa: yup.string().required('A tarefa é obrigatória!'),
      tipo: yup.string().required('O tipo é obrigatório!'),
      dias: yup.number().required('O número de dias é obrigatório!'),
      restricao: yup.string().required('A restrição é obrigatória!'),
    }),
  ),
  comentarios: yup.string(),
});
