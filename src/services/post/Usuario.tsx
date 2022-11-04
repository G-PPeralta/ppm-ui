import { api, token } from "services/api";

export async function postUsuario(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/usuarios", payload, token());
  return { status };
}

export async function updateUsuario(
  payload: any,
  id: number
): Promise<{ status: number }> {
  const { status } = await api.patch(`/usuarios/${id}`, payload);
  return { status };
}
