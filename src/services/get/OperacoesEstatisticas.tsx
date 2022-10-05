import { api, token } from "services/api";

export async function getOperacoesEstatisticas(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get(`/estatisticas/projetos`, token());

  return { data, status };
}
