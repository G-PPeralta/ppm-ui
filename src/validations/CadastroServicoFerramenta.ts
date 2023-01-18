// CRIADO EM: 27/06/2022
// AUTOR: MAXWELL MORAIS
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DO CADASTRO DE SERVIÇO FERRAMENTA

import * as yup from "yup";

export const CadastroServicoFerramenta = yup.object({
  nome_ferramenta: yup.string().required(""),
  nome_servico: yup.string().required(""),
  data_hora: yup.string().required(""),
});
