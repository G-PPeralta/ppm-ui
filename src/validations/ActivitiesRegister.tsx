// CRIADO EM: 27/06/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DO CADASTRO DE ATIVIDADES NO MÓDULO DE ATIVIDADES

import * as yup from "yup";

export const activitiesRegisterSchema = yup.object({
  area: yup.string().required("A campo Área é obrigatório"),
  responsible: yup
    .string()
    .required("O nome da pessoa responsável é obrigatório"),
  c: yup.string().required("O campo C é obrigatório"),
  spt: yup.string().required("O campo SPT é obrigatório"),
  pit: yup.string().required("O campo Poço é obrigatória"),
  id: yup.string().required("O ID é obrigatório"),
  task: yup.string().required("O campo Tarefa é obrigatório"),
  order: yup.string().required("O campo Ordem é obrigatório"),
  directSuccessors: yup
    .string()
    .required("O campo Sucessores Diretos é obrigatório"),
  directPrecedents: yup
    .string()
    .required("O campo Precedentes Diretos é obrigatório"),
  phase: yup.string().required("O campo Fase é obrigatório"),
  plannedDuration: yup
    .string()
    .required("O campo Duração Planejada é obrigatório"),
  start: yup.date().required("A data de início do projeto é obrigatória"),
  end: yup.date().required("A data de finalização do projeto é obrigatória"),
});
