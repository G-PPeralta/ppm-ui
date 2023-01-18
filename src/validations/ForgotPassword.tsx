// CRIADO EM: 03/09/2022
// AUTOR: LUIZ SCHIESTL
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÃO DO FORMULÁRIO DE RECUPERAÇÃO DE SENHA

import * as yup from "yup";

export const forgotSchema = yup.object({
  email: yup.string().email("Email inválido").required(""),
});
