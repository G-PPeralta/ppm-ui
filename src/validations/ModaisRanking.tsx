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
  // complexidade: yup.object({
  //   opcao_id: yup.string().required(),
  //   id_ranking: yup.number().required(),
  // }),
  estrategia: yup.object({
    opcao_id: yup.string().required(),
    id_ranking: yup.number().required(),
  }),
  nom_usu_create: yup.string(),
});

export const updatePriorizacao = yup.object({
  rankingName: yup.string().required(),
  idRanking: yup.number().required(),
  nom_usu_create: yup.string(),
  acesso: yup.string().required(),
});

export const createPriorizacao = yup.object({
  nom_ranking: yup.string().required("O campo é obrigatório"),
  nom_usu_create: yup.string(),
  id_area_responsavel: yup.number(),
  num_peso: yup.number(),
});

export const cadastroNovaOpcaoPriorizacao = yup.object({
  nom_opcao: yup.string().required("O campo nome é obrigatório"),
  id_ranking: yup.number().required(),
  num_nota: yup.number(),
  nom_usu_create: yup.string(),
});

export const updateNovaPriorizacao = yup.object({
  rankingName: yup.string().required(),
  idRanking: yup.number().required(),
  idOpcao: yup.number().required(),
  nom_usu_create: yup.string(),
});

export const updateNovaOpcaoDePriorizacao = yup.object({
  rankingOpcao: yup.string().required(),
  idRanking: yup.number().required(),
  idOpcao: yup.string(),
  num_nota: yup.string().required(),
  nom_usu_create: yup.string(),
});
