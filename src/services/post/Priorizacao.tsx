import { api } from "services/api";

export async function postProject(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/projetos-ranking", payload);
  return { status };
}
