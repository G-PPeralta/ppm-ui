import * as yup from "yup";

export const cadastroNovaDespesa = yup.object({
  valor: yup.string().required("Valor é requerido."),
  data: yup.string().required("Data é requerida"),
  prestadorServicoId: yup
    .number()
    .required("Prestador de serviço requerido.")
    .moreThan(0),
  classeDeServicoId: yup
    .number()
    .required("Classe de serviço requerida.")
    .moreThan(0),
  pedido: yup.string().required("Pedido requerido"),
  descricaoDoServico: yup.string().required("Descricao Requerido"),
});
