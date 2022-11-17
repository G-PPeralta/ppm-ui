import { api } from "services/api";

export async function deletePriorizacao(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/projetos-ranking/${id}/${user}`);

  return { data, status };
}

export async function deleteOpcaoPriorizacao(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/rankings-opcoes/${id}/${user}`);

  return { data, status };
}
