import * as yup from 'yup';

export const cadastroTarefaSchema = yup.object({
  nomeTarefa: yup.string().required('O nome da tarefa é obrigatório!'),
});

export const cadastroSondaSchema = yup.object({
  nomeSpt: yup.string().required('O nome da sonda é obrigatório!'),
});

export const cadastroIntervencaoSchema = yup.object({
  intervencao: yup.string().required('Nome é obrigatório'),
  poco: yup.string().required('Poco é obrigatório'),
  sonda: yup.string().required('Sonda é obrigatória'),
  inicioPrevisto: yup.string().required('Início previsto é obrigatório'),
  fimPrevisto: yup.string().required('Fim previsto é obrigatório'),
  projeto: yup.string().required('Projeto é obrigatório'),
  atividades: yup.array().of(
    yup.object({
      ordem: yup.number(),
      atividade: yup.string().required('Atividade é obrigatório'),
      responsável: yup.string(),
    }),
  ),
  observacoes: yup.string(),
});

export const cadastroAtividadeSchema = yup.object({
  nomeAtividade: yup.string().required('O nome da atividade é obrigatório!'),
  dias: yup.number().required('A quantidade de dias é obrigatória'),
  area: yup.string().required('A área é obrigatória!'),
  comentarios: yup.string(),
});

export const cadastroProjetoTipoSchema = yup.object({
  nomeProjeto: yup.string().required('O nome do projeto é obrigatório!'),
  atividades: yup.array().of(
    yup.object({
      base: yup.string().required(),
      tarefa: yup.string().required(),
      precedente: yup.string().required(),
      dias: yup.number().required(),
    }),
  ),
  comentarios: yup.string().required(),
});
