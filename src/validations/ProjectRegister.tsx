// CRIADO EM: 23/06/2022
// AUTOR: LEANDRO SANTOS
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DO CADASTRO DE PROJETOS

import * as yup from "yup";

export const projectRegisterSchema = yup.object({
  nomeProjeto: yup.string().required("O nome do projeto é obrigatório"),
  descricao: yup.string().required("A descrição do projeto é obrigatória"),
  valorTotalPrevisto: yup
    .number()
    .required("O campo de valor total previsto é obrigatório"),
  classificacaoId: yup.string(),
  solicitanteId: yup.string(),
  justificativa: yup
    .string()
    .required("O campo de justificativa é obrigatório"),
  poloId: yup.string(),
  dataInicio: yup.date().required("A data de início do projeto é obrigatória"),
  dataFim: yup
    .date()
    .required("A data de finalização do projeto é obrigatória"),
  dataInicioReal: yup
    .date()
    .required("A data de início real do projeto é obrigatória"),
  dataFimReal: yup
    .date()
    .required("A data de finalização real do projeto é obrigatória"),
  prioridadeId: yup.string(),
  complexidadeId: yup.string(),
  localId: yup.string(),
  divisaoId: yup.string(),
  statusId: yup.string(),
  gateId: yup.string(),
  tipoProjetoId: yup.string(),
  comentarios: yup.string(),
  responsavel: yup.array().of(
    yup.object({
      nomeResponsavel: yup.string().required(),
      tipoResponsavel: yup.number().required(),
    })
  ),
  elementoPep: yup.string().required(),
  coordenador: yup.string(),
  coordenador_id: yup.string(),
});
