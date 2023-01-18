// CRIADO EM: 14/06/2022
// AUTOR: ALEXANDER BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÃO DO FORMULÁRIO DE NOVA SENHA

import * as yup from "yup";

export const newPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  newPassword: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "As senhas não conferem"),
});
