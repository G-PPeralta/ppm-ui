import * as yup from 'yup';

export const registerProjectTypeSchema = yup.object({
  nameId: yup.string().required('O ID do projeto é obrigatório!'),
  projectName: yup.string().required('O nome do projeto é obrigatório!'),
  activityId: yup.string().required('O Id da atividade é obrigatório!'),
  activityBase: yup.string().required('A base da atividade é obrigatório!'),
  activityTask: yup.string().required('A tarefa da atividade é obrigatório!'),
  activityPrecedent: yup
    .string()
    .required('O precedente da atividade é obrigatório!'),
  activityDays: yup.string().required('Os dias da atividade é obrigatório!'),
  comments: yup.string(),
});
