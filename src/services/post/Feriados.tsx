import { api, token } from "services/api";

export const postCadastroFeriado = async (feriado: any) =>
  await api.post("/feriados", feriado, token());
