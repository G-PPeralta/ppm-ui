import * as yup from "yup";

export const forgotSchema = yup.object({
  email: yup.string().email("Email inválido").required(""),
});
