import { api, token } from "services/api";

export async function deletePriorizacao(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/rankings/${id}/${user}`, token());

  return { data, status };
}

export async function deleteOpcaoPriorizacao(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/rankings-opcoes/${id}/${user}`,
    token()
  );

  return { data, status };
}
