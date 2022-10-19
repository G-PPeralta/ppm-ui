import * as yup from "yup";

export const cadastroValorPrevistoSchema = yup.object({
  previsto: yup.number().required("Valor Previsto é obrigatório"),
});

export const cadastroValorPlanejadoSchema = yup.object({
  gasto: yup
    .string()
    .required("Valor Gasto é obrigatório")
    .min(1, "Valor não pode ser inferior a 1.")
    .max(1000000000000, "Valor maximo não pode ultrapasar 1000000000000 "),
  data: yup
    .date()
    .max(new Date(), "Data maxima é hoje.")
    .required("Data é Requerida"),
  fornecedor: yup.string().required("Fornecedor é Requerido"),
  servico: yup.string().required("Servico é Requerido"),
  pedido: yup
    .string()
    .required("Servico é Requerido")
    .max(100, "Maximo 100 caracteres")
    .matches(/^[a-zA-Z0-9]+$/, "O campo precisa ser alfanumerico."),
  pedido_obs: yup
    .string()
    .required("Txt do pedido  é requerido.")
    .min(50, "O texto precisa ter no minimo 50 caracteres.")
    .max(240, "Max 240 caracteres "),
});
