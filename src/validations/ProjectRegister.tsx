import * as yup from 'yup';

export const projectRegisterSchema = yup.object({
  name: yup.string().required('O nome do projeto é obrigatório'),
  description: yup.string().required('A descrição do projeto é obrigatória'),
  budget: yup
    .number()
    .required('O campo de valor total previsto é obrigatório'),
  classification: yup.string(),
  requester: yup.string(),
  justification: yup
    .string()
    .required('O campo de justificativa é obrigatório'),
  pole: yup.string(),
  start: yup.date().required('A data de início do projeto é obrigatória'),
  end: yup.date().required('A data de finalização do projeto é obrigatória'),
  startReal: yup
    .date()
    .required('A data de início real do projeto é obrigatória'),
  endReal: yup
    .date()
    .required('A data de finalização real do projeto é obrigatória'),
  priority: yup.string(),
  complexity: yup.string(),
  place: yup.string(),
  division: yup.string(),
  status: yup.string(),
  gate: yup.string(),
  typeProject: yup.string(),
  demand: yup.string(),
  comments: yup.string().required(''),
});
