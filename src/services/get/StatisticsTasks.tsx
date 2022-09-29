import { api, token } from "services/api";

export async function getStatisticsTasks(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get(`/estatisticas/campanha`, token());

  return { data, status };
}
