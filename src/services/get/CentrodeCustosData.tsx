import { api, token } from "services/api";

export async function getDataInicialFinalProjeto(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/centro-custo/datas/${id}`, token());

  return { data, status };
}
