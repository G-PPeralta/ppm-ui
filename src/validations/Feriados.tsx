import * as yup from "yup";

export const cadastroFeriadoSchema = yup.object({
  nome_feriado: yup.string().required("Campo obrigatório"),
  data_completa: yup.date().required("Campo obrigatório"),
  ind_global: yup.number().required("Campo obrigatório"),
  id_projeto: yup.number().when("ind_global", {
    is: 0,
    then: yup.number().required("Campo obrigatório").moreThan(0),
  }),
});

export const editarFeriadoSchema = yup.object({
  id_projeto: yup.number().when("ind_global", {
    is: 0,
    then: yup.number().required("Campo obrigatório").moreThan(0),
  }),
});
