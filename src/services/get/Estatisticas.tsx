import { api, token } from "services/api";

export async function getOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao", token());

  return { data, status };
}

export async function getPocosOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao/poco", token());

  return { data, status };
}

export async function getSondasOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao/sonda", token());

  return { data, status };
}
