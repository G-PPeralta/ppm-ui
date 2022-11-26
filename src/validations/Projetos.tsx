import * as yup from "yup";

export const cadastroAtividadeProjetos = yup.object({
  id_projeto: yup.number().required("Campo obrigatório").moreThan(0),
  nom_atividade: yup.string().required("Campo obrigatório"),
  responsavel_id: yup.number().required("Campo obrigatório").moreThan(0),
  relacao_id: yup.number().required("Campo obrigatório").moreThan(0),
  dat_inicio_plan: yup.string().required("Campo obrigatório"),
  duracao_plan: yup.number().required("Campo obrigatório").moreThan(0),
  nao_iniciar_antes_de: yup.object({
    data: yup.string(),
    checked: yup.boolean(),
  }),
  nao_terminar_depois_de: yup.object({
    data: yup.string(),
    checked: yup.boolean(),
  }),
  o_mais_breve_possivel: yup.boolean(),
  precedentes: yup.array().of(
    yup.object({
      atividadePrecedenteId: yup.number(),
      dias: yup.number(),
    })
  ),
});

export const cadastroProjetoSchema = yup.object({
  responsavelId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  coordenadorId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  poloId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  localId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  solicitanteId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  statusId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  nomeProjeto: yup.string().required("Campo obrigatório"),
  elementoPep: yup.string().required("Campo obrigatório"),
  // dataInicio: yup.string().required("Campo obrigatório"),
  capexPrevisto: yup.string().required("Campo obrigatório"),
  // complexidadeId: yup
  //   .number()
  //   .required("Campo obrigatório")
  //   .moreThan(0, "Campo obrigatório"),
  divisaoId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  classificacaoId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  tipoProjetoId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  gateId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  descricao: yup.string().required("Campo obrigatório"),
  justificativa: yup.string().required("Campo obrigatório"),
  comentarios: yup.string(),
});
