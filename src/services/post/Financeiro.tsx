import { api, token } from "services/api";

export async function postCadastroDespesa(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/????????", payload, token());
  return { status };
}
