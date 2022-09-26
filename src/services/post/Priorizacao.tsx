import { api } from "services/api";

export async function postProject(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/projetos-ranking", payload);
  return { status };
}

export async function updateRanking(
  payload: any,
  id: number
): Promise<{ status: number }> {
  const { status } = await api.patch(`/ranking/${id}`, payload);
  return { status };
}

export async function createRanking(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/rankings", payload);
  return { status };
}

export async function updateOptionRanking(
  id: number,
  newValue: string,
  userName: string
): Promise<{ status: number }> {
  const { status } = await api.patch(
    `rankings-opcoes/${id}/nom_opcao/${newValue}/${userName}`
  );
  return { status };
}

export async function postOptionRanking(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(`/rankings-opcoes`, payload);
  return { status };
}
