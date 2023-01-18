// CRIADO EM: 21/10/2022
// AUTOR: FELIPE MATEUS
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DO CADASTRO DE TAREFAS NO MÓDULO DE ATIVIDADES

import * as yup from "yup";

export const cadastroModalTarefaSchema = yup.object({
  nomeTarefa: yup.string().required("Nome tarefa é requerido."),
  atividadeRel: yup.string().required("Nome da atividade é requerido."),
  data: yup.date().required("Data é requerido."),
  responsavel: yup.string().required("Responsavel é requerido."),
  descricao: yup.string(),
});
