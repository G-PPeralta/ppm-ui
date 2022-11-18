import { api } from "services/api";

export async function deleteLixeira(
  id: number,
  table_name: string
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`lixeira/${id}/${table_name}`);

  return { data, status };
}
