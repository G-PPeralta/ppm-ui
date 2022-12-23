import { api, token } from "services/api";

export async function postProject(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/projetos-ranking", payload, token());
  return { status };
}

export async function updateRanking(
  payload: any,
  id: number
): Promise<{ status: number }> {
  const { status } = await api.patch(`/ranking/${id}`, payload, token());
  return { status };
}

export async function createRanking(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/rankings", payload, token());
  return { status };
}

export async function updateOptionRanking(
  id: number,
  newValue: string,
  userName: string
): Promise<{ status: number }> {
  const { status } = await api.patch(
    `rankings-opcoes/${id}/nom_opcao/${newValue}/${userName}`,
    token()
  );
  return { status };
}

export async function updateOptionRankingNota(
  id: number,
  newValue: string,
  userName: string
): Promise<{ status: number }> {
  const { status } = await api.patch(
    `rankings-opcoes/${id}/num_nota/${newValue}/${userName}`,
    token()
  );
  return { status };
}

export async function postOptionRanking(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(`/rankings-opcoes`, payload, token());
  return { status };
}
