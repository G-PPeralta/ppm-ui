import * as yup from 'yup';

export const cadastroTarefaSchema = yup.object({
  nomeTarefa: yup.string().required('O nome da tarefa é obrigatório!'),
});

export const cadastroSondaSchema = yup.object({
  nomeSpt: yup.string().required('O nome da sonda é obrigatório!'),
});

export const cadastroIntervencaoSchema = yup.object({
  poco: yup.string().required('Poco é obrigatório'),
  campo: yup.string().required('Campo é obrigatório'),
  sonda: yup.string().required('Sonda é obrigatória'),
  sequencia: yup.string().required('Sequência é obrigatória'),
  inicioPrevisto: yup.string().required('Início previsto é obrigatório'),
  projeto: yup.string().required('Projeto é obrigatório'),
  observacoes: yup.string().required('Observações é obrigatório'),
});

export const cadastroAtividadeSchema = yup.object({
  nomeAtividade: yup.string().required('O nome da atividade é obrigatório!'),
  responsavel: yup.string().required('O responsável é obrigatório!'),
  area: yup.string().required('A área é obrigatória!'),
  precedente: yup.array().of(
    yup.object({
      tarefa: yup.string().required('A tarefa é obrigatória!'),
      tipo: yup.string().required('O tipo é obrigatório!'),
      dias: yup.number().required('O número de dias é obrigatório!'),
      restricao: yup.string().required('A restrição é obrigatória!'),
    }),
  ),
  comentarios: yup.string(),
});

export const cadastroProjetoTipoSchema = yup.object({
  nomeProjeto: yup.string().required('O nome do projeto é obrigatório!'),
  atividades: yup.array().of(
    yup.object({
      base: yup.string().required('A atividade base é obrigatória!'),
      tarefa: yup.string().required('A tarefa é obrigatória!'),
      precedente: yup
        .string()
        .required('A atividade precedente é obrigatória!'),
      dias: yup.number().required('O número de dias é obrigatório!'),
    }),
  ),
  comentarios: yup.string(),
});
