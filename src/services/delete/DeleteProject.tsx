// import { ProjetosRankingPayload } from "interfaces/Services";

import { api } from "services/api";

export async function deleteProject(
  id_projeto: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/projetos/${id_projeto}`);

  return { data, status };
}

// DELETE /projetos-ranking/:id/:user ???????

/**
 * Deletar Atividade do gantt de projetos e os seus nós filhos
 * @param id
 * @returns
 */
export async function deleteAtividade(
  id: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/gantt/${id}`);

  return { data, status };
}
