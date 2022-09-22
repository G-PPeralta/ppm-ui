import * as yup from "yup";

export const cadastroNovaPriorizacaoSchema = yup.object({
  id_projeto: yup.number(),
  beneficio: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number(),
  }),
  regulatorio: yup.object({
    opcao_id: yup.string(),
    id_ranking: yup.number(),
  }),
  operacao: yup.object({
    opcao_id: yup.string(),
    id_ranking: yup.number(),
  }),
  prioridade: yup.object({
    opcao_id: yup.string(),
    id_ranking: yup.number(),
  }),
  complexidade: yup.object({
    opcao_id: yup.string(),
    id_ranking: yup.number(),
  }),
  estrategia: yup.object({
    opcao_id: yup.string(),
    id_ranking: yup.number(),
  }),
  nom_usu_create: yup.string(),
});
