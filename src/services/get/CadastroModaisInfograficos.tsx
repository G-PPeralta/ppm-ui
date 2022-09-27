import { api, token } from "services/api";

export async function getSondas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/campanha", token());

  return { data, status };
}

export async function getPocos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/poco", token());

  return { data, status };
}

export async function getResponsaveis(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/responsavel", token());

  return { data, status };
}

export async function getArea(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/areas", token());

  return { data, status };
}

export async function getCampo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/campos", token());

  return { data, status };
}

export async function getProjetosTipo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/campanha-projeto-tipo", token());

  return { data, status };
}

export async function getAtividadasByProjetosTipoId(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/campanha-projeto-tipo/${id}`,
    token()
  );

  return { data, status };
}

export async function getSonda(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/sonda", token());

  return { data, status };
}

export async function getTarefas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-atividade/tarefas", token());

  return { data, status };
}

export async function getAtividadesDataMais15(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha/find/datas/${id}`, token());

  return { data, status };
}
