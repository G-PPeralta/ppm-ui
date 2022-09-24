import * as yup from "yup";

export const cadastroNovaPriorizacaoSchema = yup.object({
  id_projeto: yup.number(),
  beneficio: yup
    .object({
      opcao_id: yup.string().required(),
      id_ranking: yup.number().required(),
    })
    .required("Selecione uma opção"),
  regulatorio: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number().required(),
  }),
  operacao: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number().required(),
  }),
  prioridade: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number().required(),
  }),
  complexidade: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number().required(),
  }),
  estrategia: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number().required(),
  }),
  nom_usu_create: yup.string(),
});

export const cadastroNovaPriorizacao = yup.object({
  rankingName: yup.string().required(),
  nom_usu_create: yup.string(),
});
