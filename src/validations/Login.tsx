// CRIADO EM: 14/06/2022
// AUTOR: ALEXANDER BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÃO DO FORMULÁRIO DE LOGIN

import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required(""),
  senha: yup.string().required("Campo obrigatório"),
});
