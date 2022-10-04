import { api, token } from "services/api";

export async function getOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao", token());

  return { data, status };
}
