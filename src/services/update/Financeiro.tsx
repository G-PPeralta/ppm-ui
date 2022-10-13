import { api, token } from "services/api";

export async function putEditarDespesa(
  id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.put(
    `/???????????/${id}`,
    payload,
    token()
  );

  return { data, status };
}
