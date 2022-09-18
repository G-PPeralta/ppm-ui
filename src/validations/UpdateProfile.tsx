import * as yup from "yup";

export const updateProfileSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  telephone: yup.string().required("O telefone é obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  area: yup.string().required("O área é obrigatória"),
  accessLevel: yup.string().required("O nível de acesso é obrigatório"),
});
