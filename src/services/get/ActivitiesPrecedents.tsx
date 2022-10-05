import { api, token } from "services/api";

export async function getAtividadesPrecedents(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha/precedentes`, token());

  return { data, status };
}
