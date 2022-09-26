import * as yup from "yup";

export const cadastroValorPrevistoSchema = yup.object({
  previsto: yup.number().required("Valor Previsto é obrigatório"),
});
