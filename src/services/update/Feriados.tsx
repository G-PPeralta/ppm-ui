import { api, token } from "services/api";

export const updateFeriado = async (payload: any) =>
  await api.patch(`/feriados/${payload.id}`, payload, token());
