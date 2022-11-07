import * as yup from "yup";

export const cadastroFornecedor = yup.object({
  poloId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório")
    .typeError("Campo obrigatório"),
  servico: yup.string().required("Campo obrigatório"),
  statusId: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório"),
  nomeFornecedor: yup.string().required("Campo obrigatório"),
  numeroContrato: yup.string().required("Campo obrigatório"),
  representante: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("O campo deve ser um e-mail válido"),
  telefone: yup.string().required("Campo obrigatório"),
  invoice: yup.string().required("Campo obrigatório"),
  cnpj: yup.string().required("Campo obrigatório"),
  justificativa: yup.string().required("Campo obrigatório"),
  outrasInformacoes: yup.string(),
});
