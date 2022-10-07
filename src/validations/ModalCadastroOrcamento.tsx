import * as yup from "yup";

export const cadastroValorPrevistoSchema = yup.object({
  previsto: yup.number().required("Valor Previsto é obrigatório"),
});

export const cadastroValorPlanejadoSchema = yup.object({
  gasto: yup.number().required("Valor Gasto é obrigatório"),
  data: yup.date().required("Data é Requerida"),
  fornecedor: yup.string().required("Fornecedor é Requerido"),
  servico: yup.string().required("Servico é Requerido"),
  pedido: yup.string().required("Servico é Requerido"),
  pedido_obs: yup.string(),
});
