import { api, token } from "services/api";

export async function deleteInfograficos(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/campanha/${id}/${user}`, token());

  return { data, status };
}
