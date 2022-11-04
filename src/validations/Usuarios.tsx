import * as yup from "yup";

export const cadastroUsuario = yup.object({
  id: yup
    .number()
    .required("Campo obrigatório")
    .moreThan(0, "Campo obrigatório")
    .typeError("Campo obrigatório"),

  area: yup.string().required("Campo obrigatório"),
  login: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("O campo deve ser um e-mail válido"),
  telefone: yup.string().required("Campo obrigatório"),
  nome: yup.string().required("Campo obrigatório"),
  perfil: yup.string().required("Campo obrigatório"),
});
