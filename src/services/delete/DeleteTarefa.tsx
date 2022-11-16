import { api } from "services/api";

export async function deleteTarefa(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/tarefas/${id}/${user}`);

  return { data, status };
}
