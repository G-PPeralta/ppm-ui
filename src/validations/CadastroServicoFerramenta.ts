import * as yup from "yup";

export const CadastroServicoFerramenta = yup.object({
  // id_atividade: yup.string().required(""),
  nome_ferramenta: yup.string().required(""),
  nome_servico: yup.string().required(""),
  data_hora: yup.string().required(""),
});
