import { api, token } from "services/api";

export async function postCadastroAtividadeProjetos(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/projetos/vincular", payload, token());
  return { status };
}
