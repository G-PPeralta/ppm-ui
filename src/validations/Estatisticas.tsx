import * as yup from "yup";

export const cadastroNovoCronogramaSchema = yup.object({
  sonda_id: yup.number().required().moreThan(0),
  poco_id: yup.number().required().moreThan(0),
  atividades: yup.array().of(
    yup.object({
      area_id: yup.number().required().moreThan(0),
      operacao_id: yup.number().required().moreThan(0),
      responsavel_id: yup.number().required().moreThan(0),
      data_inicio: yup.string().required().min(0),
      duracao: yup.number().required().moreThan(0),
      precedentes: yup.array().of(
        yup.object({
          id: yup.number(),
          nome: yup.string(),
          checked: yup.boolean(),
        })
      ),
    })
  ),
  comentarios: yup.string(),
});
