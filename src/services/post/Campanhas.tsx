import { api, token } from "services/api";

export async function getCampanhasInfo(payload: any): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.post("/campanha", payload, token());

  return { data, status };
}

export async function getCampanhasGantt(payload: any): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.post("/campanha/gantt", payload, token());

  return { data, status };
}
