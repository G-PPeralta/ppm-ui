// import { ProjetosRankingPayload } from "interfaces/Services";

import { api, token } from "services/api";

export async function deleteProject(
  id_projeto: any,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/projetos/${id_projeto}/${user}`,
    token()
  );

  return { data, status };
}

// DELETE /projetos-ranking/:id/:user ???????

/**
 * Deletar Atividade do gantt de projetos e os seus nós filhos
 * @param id
 * @returns
 */
export async function deleteAtividade(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/gantt/${id}/${user}`, token());

  return { data, status };
}
