import * as yup from "yup";

export const cadastroNovaDespesa = yup.object({
  valor: yup.number().required().moreThan(0),
  data: yup.string().required(),
  prestadorServicoId: yup.number().required().moreThan(0),
  classeDeServicoId: yup.number().required().moreThan(0),
  pedido: yup.string().required(),
  descricaoDoServico: yup.string().required(),
});
