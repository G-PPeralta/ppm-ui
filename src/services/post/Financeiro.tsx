import { api, token } from "services/api";

export async function postCadastroDespesa(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/centro-custo", payload, token());
  return { status };
}
