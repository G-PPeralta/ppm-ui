import { api, token } from "services/api";

export async function getStatisticsTasks(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get(`/estatisticas/projetos`, token());

  return { data, status };
}
