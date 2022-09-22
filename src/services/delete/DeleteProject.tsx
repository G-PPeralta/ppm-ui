// import { ProjetosRankingPayload } from "interfaces/Services";

import { api } from "services/api";

export async function deleteProject(
  id_projeto: number,
  id_usu_create: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/projetos-ranking/${id_projeto}/${id_usu_create}`,
    payload
  );

  return { data, status };
}

// DELETE /projetos-ranking/:id/:user ???????
