import { api, token } from "services/api";

export async function restoreLixeira(
  id: number,
  table_name: string
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `lixeira/${id}/${table_name}`,
    token()
  );

  return { data, status };
}
