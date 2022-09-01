import * as yup from 'yup';

export const registerProjectTypeSchema = yup.object({
  nomeId: yup.string().required('O ID do projeto é obrigatório!'),
  nomeProjeto: yup.string().required('O nome do projeto é obrigatório!'),
  atividadeId: yup.string().required('O Id da atividade é obrigatório!'),
  atividadeBase: yup.string().required('A base da atividade é obrigatório!'),
  atividadeTarefa: yup
    .string()
    .required('A tarefa da atividade é obrigatório!'),
  atividadePrecedente: yup
    .string()
    .required('O precedente da atividade é obrigatório!'),
  atividadeDias: yup.string().required('Os dias da atividade é obrigatório!'),
  comentarios: yup.string(),
});
