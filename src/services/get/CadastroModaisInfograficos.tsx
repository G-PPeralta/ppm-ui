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

export async function getProjetosTipo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/projeto-intervencao", token());

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
