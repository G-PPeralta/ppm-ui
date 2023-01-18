// CRIADO EM: 03/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DOS CADASTROS DO MÓDULO DE ESTATÍSTICAS

import * as yup from "yup";

export const cadastroNovoCronogramaSchema = yup.object({
  sonda_id: yup.number().required().moreThan(0),
  poco_id: yup.number().required().moreThan(0),
  atividades: yup.array().of(
    yup.object({
      area_id: yup.number().required().moreThan(0),
      operacao_id: yup.number().required().moreThan(0),
      responsavel_id: yup.number().required().moreThan(0),
      data_inicio: yup.string().required().min(0),
      duracao: yup.number().required().moreThan(0),
      precedentes: yup.array().of(
        yup.object({
          id: yup.number(),
          nome: yup.string(),
          checked: yup.boolean(),
        })
      ),
    })
  ),
  comentarios: yup.string(),
});

export const cadastroOperacaoSchema = yup.object({
  nom_operacao: yup.string().required("O nome da atividade é obrigatório!"),
});

export const cadastroNovoCronograma = yup.object({
  sonda_id: yup.number().required().moreThan(0),
  poco_id: yup.number().required().moreThan(0),
});

export const cadastroLicaoAprendida = yup.object({
  licao_aprendida: yup.string().required("O campo é obrigatório!"),
  data: yup.string().required("O campo é obrigatório!"),
  acoes_e_recomendacoes: yup.string().required("O campo é obrigatório!"),
});

export const cadastroOcorrenciaAtividade = yup.object({
  ocorrencia: yup.string(),
  impacto: yup.string().required("O campo é obrigatório!"),
});

export const editarAtividadeGanttSchema = yup.object({
  id_atividade: yup.number().required("Campo obrigatório").moreThan(0),
  nome_atividade: yup.string().required("Campo obrigatório"),
  pct_real: yup.number().required("Campo obrigatório"),
  hrs_reais: yup.number().required("Campo obrigatório"),
  inicio_realizado: yup.date().required("Campo obrigatório"),
  fim_realizado: yup.date().required("Campo obrigatório"),
  inicio_planejado: yup.date(),
  fim_planejado: yup.date(),
  inicio_real: yup.date(),
  fim_real: yup.date(),
  anotacoes: yup.string(),
  mocs: yup.array().of(
    yup.object({
      numero_moc: yup.string(),
    })
  ),
});

export const cadastroAtividadeEstatisticaSchema = yup.object({
  id_sonda: yup.number().required("Campo obrigatório").moreThan(0),
  id_poco: yup.number().required("Campo obrigatório").moreThan(0),
  operacao_id: yup.number().required("Campo obrigatório").moreThan(0),
  duracao: yup.string().required("Campo obrigatório"),
  data_inicio: yup.string().required("Campo obrigatório"),
  data_fim: yup.string().required("Campo obrigatório"),
});
