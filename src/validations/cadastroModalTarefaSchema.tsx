import * as yup from "yup";

export const cadastroModalTarefaSchema = yup.object({
  nomeTarefa: yup.string().required("Nome tarefa é requerido."),
  atividadeRel: yup.string(),
  data: yup.date().required("Data é requerido."),
  responsavel: yup.string().required("Responsavel é requerido."),
  descricao: yup.string(),
});
