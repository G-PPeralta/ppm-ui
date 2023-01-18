// CRIADO EM: 12/10/2022
// AUTOR: EDUARDO MUCHAK
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DO CADASTRO DE DESPESAS DO MÓDULO FINANCEIRO

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
  descricaoDoServico: yup.string(),
});
