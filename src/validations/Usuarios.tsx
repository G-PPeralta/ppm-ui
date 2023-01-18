// CRIADO EM: 04/11/2022
// AUTOR: GEOVANA AUGUSTA
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE VALIDAÇÕES DE CADASTRO E ATUALIZAÇÃO DE USUÁRIOS

import * as yup from "yup";

export const cadastroUsuario = yup.object({
  areaAtuacao: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("O campo deve ser um e-mail válido"),
  telefone: yup.string().required("Campo obrigatório"),
  nome: yup.string().required("Campo obrigatório"),
  senha: yup.string().notRequired(),
});

export const updateUsuario = yup.object({
  areaAtuacao: yup.string(),
  email: yup.string().email("O campo deve ser um e-mail válido"),
  telefone: yup.string(),
  nome: yup.string(),
  roleId: yup.number(),
});
