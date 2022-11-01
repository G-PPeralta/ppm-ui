// import { ProjetosRankingPayload } from "interfaces/Services";

import { api } from "services/api";

export async function deleteProject(
  id_projeto: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/projetos/${id_projeto}`);

  return { data, status };
}

// DELETE /projetos-ranking/:id/:user ???????
