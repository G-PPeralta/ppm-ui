import { api } from "services/api";

export async function deleteTarefa(
  id: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/tarefas/${id}`);

  return { data, status };
}
