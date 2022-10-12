import * as yup from "yup";

export const cadastroNovaDespesa = yup.object({
  valor: yup.string().required(),
  data: yup.string().required(),
  fornecedorId: yup.number().required().moreThan(0),
  classeDeServicoId: yup.number().required().moreThan(0),
  pedido: yup.string().required(),
  textoDoPedido: yup.string().required(),
});
