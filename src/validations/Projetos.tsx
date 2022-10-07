import * as yup from "yup";

export const cadastroAtividadeProjetos = yup.object({
  id_projeto: yup.number().required("Campo obrigatório").moreThan(0),
  id_origem: yup.string().required("Campo obrigatório"),
  nom_atividade: yup.string().required("Campo obrigatório"),
  responsavel_id: yup.number().required("Campo obrigatório").moreThan(0),
  relacao_id: yup.number().required("Campo obrigatório").moreThan(0),
  dat_inicio_plan: yup.string().required("Campo obrigatório"),
  duracao_plan: yup.number().required("Campo obrigatório").moreThan(0),
  area_atuacao: yup.number().required("Campo obrigatório").moreThan(0),
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
