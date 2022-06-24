import * as yup from 'yup';

export const projectRegisterSchema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição do projeto é obrigatória'),
  budget: yup.string().required('O campo de orçamento obrigatório'),
  departament: yup.string().required('O departamento do projeto é obrigatório'),
  totalDays: yup
    .number()
    .required('A duração total em dias do projeto é obrigatória'),
  realDays: yup
    .number()
    .required('A duração real em dias do projeto é obrigatória'),
  start: yup.date().required('A data de início do projeto é obrigatória'),
  end: yup.date().required('A data de finalização do projeto é obrigatória'),
  priority: yup.string().required('A prioridade do projeto é obrigatória'),
});
