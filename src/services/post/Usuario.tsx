import { api, token } from "services/api";

export async function postUsuario(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/usuarios", payload, token());
  return { status };
}
