// CRIADO EM: 26/09/2022
// AUTOR: FELIPE MATEUS
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DO MODAL DE CADASTRO DE ORÇAMENTO

import * as yup from "yup";

export const cadastroValorPrevistoSchema = yup.object({
  valor: yup.string().required("Valor Previsto é obrigatório"),
});

export const cadastroValorPlanejadoSchema = yup.object({
  gasto: yup
    .number()
    .required("Valor Gasto é obrigatório")
    .min(1, "Valor não pode ser inferior a 1.")
    .max(1000000000000, "Valor maximo não pode ultrapasar 1000000000000 "),
  data: yup
    .date()
    .max(new Date(), "Data maxima é hoje.")
    .required("Data é Requerida"),
  fornecedor: yup.string().required("Fornecedor é Requerido"),
  servico: yup.string().required("Servico é Requerido"),
  pedido: yup.number().required("Pedido é Requerido").moreThan(0),
  pedido_obs: yup
    .string()
    .required("Txt do pedido  é requerido.")
    .max(240, "Max 240 caracteres "),
});
