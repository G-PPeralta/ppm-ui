import * as yup from "yup";

export const cadastroNovaPriorizacaoSchema = yup.object({
  beneficio: yup.string().required("Selecione uma opção"),
  regulatorio: yup.string().required("Selecione uma opção"),
  operacao: yup.string().required("Selecione uma opção"),
  prioridade: yup.string().required("Selecione uma opção"),
  complexidade: yup.string().required("Selecione uma opção"),
  estrategia: yup.string().required("Selecione uma opção"),
});
