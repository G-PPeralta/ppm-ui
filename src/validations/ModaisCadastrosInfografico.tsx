import * as yup from "yup";

export const cadastroTarefaSchema = yup.object({
  nomeTarefa: yup.string().required("O nome da tarefa é obrigatório!"),
});

export const cadastroSondaSchema = yup.object({
  nomeSpt: yup.string().required("O nome da sonda é obrigatório!"),
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
  poco: yup.string().required("O nome do poço é obrigatório!"),
});

export const cadastroNovaCampanhaSchema = yup.object({
  nome: yup.string().required("O nome da campanha é obrigatório!"),
  comentarios: yup.string(),
});
