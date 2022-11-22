import { api } from "services/api";

export async function deleteInfograficos(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/campanha/${id}/${user}`);

  return { data, status };
}
