import { api, token } from "services/api";

export async function getInitialRaking(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos-ranking/find/${id}`,
    token()
  );

  return { data, status };
}
