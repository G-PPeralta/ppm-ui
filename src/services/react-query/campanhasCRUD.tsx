import { api, token } from "services/api";

export const postNovaCampanhaRQ: any = async (payload: any) =>
  await api.post("/campanha/pai", payload, token());
