import { api, token } from "services/api";

export async function getCurvaSInfos(id: string | undefined): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos/previsXRealizadoProjeto/${id}`,
    token()
  );

  return { data, status };
}
