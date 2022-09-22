import { ProjetosRanking } from "interfaces/Services";

import { api } from "services/api";

export async function putFornecedor(
  id: number,
  payload: ProjetosRanking
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/projetos-ranking/${id}`, payload);

  return { data, status };
}

// DELETE /projetos-ranking/:id/:user ???????
