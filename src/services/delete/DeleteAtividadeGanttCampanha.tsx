import { api, token } from "services/api";

export async function deleteAtividadeGanttCampanha(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/campanha/${id}/${user}`, token());

  return { data, status };
}
