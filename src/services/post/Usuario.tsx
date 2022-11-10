import { api, token } from "services/api";

export async function getUsers(): Promise<{ status: number }> {
  const { status } = await api.get("/user");
  return { status };
}

export async function postUsuario(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/user", payload, token());
  return { status };
}

export async function updateUser(
  payload: any,
  id: number
): Promise<{ status: number }> {
  const { status } = await api.put(`/user/${id}`, payload);
  return { status };
}
