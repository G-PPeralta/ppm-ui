import * as yup from "yup";

export const cadastroTarefaSchema = yup.object({
  nomeTarefa: yup.string().required("O nome da tarefa é obrigatório!"),
});

export const cadastroSondaSchema = yup.object({
  nome: yup
    .string()
    // .required("O nome da sonda é obrigatório!")
    .min(3, "O nome deve ter ao menos 3 caracteres!"),
});

export const cadastroIntervencaoSchema = yup.object({
  nome: yup.string().required("O Nome da Intervenção é obrigatório"),
  pocoId: yup.number().required("Poco é obrigatório"),
  sptId: yup.number().required("Sonda é obrigatória"),
  tipoProjetoId: yup.number().required("Projeto é obrigatório"),
  inicioPlanejado: yup.string().required("Início previsto é obrigatório"),
  fimPlanejado: yup.string(),
  atividades: yup
    .array()
    .of(
      yup.object({
        ordem: yup.number(),
        atividade: yup.string(),
        responsavel: yup.string().required(),
      })
    )
    .required("Atividades são obrigatórias"),
  observacoes: yup.string(),
});

export const cadastroAtividadeSchema = yup.object({
  id_origem: yup.string().required("O ID é obrigatório!"),
  nom_atividade: yup.string().required("O nome da atividade é obrigatório!"),
  responsavel_id: yup.number().required("O responsável é obrigatório!"),
  area_atuacao: yup.string().required("A área de atuação é obrigatória!"),
  nao_iniciar_antes_de: yup.object({
    data: yup.string(),
    checked: yup.boolean(),
  }),
  nao_terminar_depois_de: yup.object({
    data: yup.string(),
    checked: yup.boolean(),
  }),
  o_mais_breve_possivel: yup.boolean(),
});

export const cadastroProjetoTipoSchema = yup.object({
  nom_projeto_tipo: yup
    .string()
    .required("O nome do projeto é obrigatório!")
    .min(3, "O nome deve ter ao menos 3 caracteres!"),
  atividades: yup.array().of(
    yup.object({
      atividade_id_origem: yup.string().required(),
      area_id: yup.number().required().moreThan(0),
      tarefa_id: yup.number().required().moreThan(0),
      qtde_dias: yup.number().required().moreThan(0),
      precedentes: yup.array().of(
        yup.object({
          id: yup.number(),
          nome: yup.string(),
          checked: yup.boolean(),
        })
      ),
      fase_id: yup.number().required().moreThan(0),
    })
  ),
  comentarios: yup.string(),
});

export const cadastroPocoSchema = yup.object({
  poco: yup
    .string()
    .required("Campo obrigatório!")
    .min(3, "O nome deve ter ao menos 3 caracteres!"),
});

export const cadastroNovaCampanhaSchema = yup.object({
  id_projeto: yup.string().required("O campo é obrigatório"),
  dsc_comentario: yup.string(),
});

export const reorderSchema = yup.object({
  id_campanha_original: yup.string().required("O campo é obrigatório"),
  id_campanha_destino: yup.string().required("O campo é obrigatório"),
  id_cronograma_original: yup.string().required("O campo é obrigatório"),
});

export const cadastroNovaIntervencaoSchema = yup.object({
  id_campanha: yup.number().required().moreThan(0),
  poco_id: yup.string().required(),
  projeto_tipo_id: yup.number().required().moreThan(0),
  dat_ini_prev: yup.string().required(),
  atividades: yup.array().of(
    yup.object({
      area_id: yup.number().required().moreThan(0),
      tarefa_id: yup.number().required().moreThan(0),
      responsavel_id: yup.number().required().moreThan(0),
      qtde_dias: yup.number().required().moreThan(0),
      ind_atv_execucao: yup.boolean(),
    })
  ),
  comentarios: yup.string(),
});

export const cadastroNovaAtividadeSchema = yup.object({
  nom_atividade: yup.string().required("Poço é obrigatório"),
  pct_real: yup.number().required("Sonda é obrigatória"),
  dat_ini_plan: yup.string().required("A data e hora de início é obrigatória"),
  dat_fim_plan: yup.string().required("A data e hora de fim é obrigatória"),
  dsc_comentario: yup.string().required("O comentário é obrigatório"),
});

export const cadastroAtividadeIntervencaoSchema = yup.object({
  // id_origem: yup.string().required("Campo obrigatório!"),
  // nom_atividade: yup.string().required("Campo obrigatório!"),
  atividade_id: yup.number().required("Campo obrigatório!").moreThan(0),
  responsavel_id: yup.number().required("Campo obrigatório!").moreThan(0),
  area_atuacao: yup.number().required("Campo obrigatório!").moreThan(0),
  duracao: yup.number().required("Campo obrigatório!").moreThan(0),
  precedentes: yup.array().of(
    yup.object({
      atividadePrecedenteId: yup.number(),
      dias: yup.number(),
    })
  ),
  // nao_iniciar_antes_de: yup.object({
  //   data: yup.string(),
  //   checked: yup.boolean(),
  // }),
  // nao_terminar_depois_de: yup.object({
  //   data: yup.string(),
  //   checked: yup.boolean(),
  // }),
  // o_mais_breve_possivel: yup.boolean(),
});
