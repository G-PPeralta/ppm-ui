import * as yup from "yup";

export const cadastroTarefaSchema = yup.object({
  nomeTarefa: yup.string().required("O nome da tarefa é obrigatório!"),
});

export const cadastroSondaSchema = yup.object({
  sonda: yup
    .string()
    .required("O nome da sonda é obrigatório!")
    .min(3, "O nome da sonda deve ter ao menos 3 caracteres"),
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
  nomeAtividade: yup.string().required("O nome da atividade é obrigatório!"),
  dias: yup.number().required("A quantidade de dias é obrigatória"),
  area: yup.string().required("A área é obrigatória!"),
  comentarios: yup.string(),
});

export const cadastroProjetoTipoSchema = yup.object({
  nomeProjeto: yup.string().required("O nome do projeto é obrigatório!"),
  atividades: yup.array().of(
    yup.object({
      atividade: yup.string().required(),
      precedentes: yup.array().of(
        yup.object({
          id: yup.string(),
          nomeAtividade: yup.string(),
        })
      ),
    })
  ),
  comentarios: yup.string().required(),
});

export const cadastroPocoSchema = yup.object({
  poco: yup
    .string()
    .required("Campo obrigatório!")
    .min(3, "O nome do poço deve ter ao menos 3 caracteres"),
});

export const cadastroNovaCampanhaSchema = yup.object({
  nom_campanha: yup
    .string()
    .min(3)
    .required("O nome da campanha é obrigatório!"),
  dsc_comentario: yup.string(),
});

export const cadastroNovaIntervencaoSchema = yup.object({
  nom_atividade: yup.string().min(3).required("Poço é obrigatório"),
  id_campanha: yup.number().min(3).required("Sonda é obrigatória"),
  dsc_comentario: yup.string(),
});

export const cadastroNovaAtividadeSchema = yup.object({
  nom_atividade: yup.string().required("Poço é obrigatório"),
  pct_real: yup.number().required("Sonda é obrigatória"),
  dat_ini_plan: yup.string().required("A data e hora de início é obrigatória"),
  dat_fim_plan: yup.string().required("A data e hora de fim é obrigatória"),
  dsc_comentario: yup.string(),
});
