import { api, token } from "services/api";

export async function getSondas() {
  const { data } = await api.get(`/filtros/sondas`, token());
  return data;
}

export async function getPocos() {
  const { data } = await api.get(`/filtros/pocos`, token());
  return data;
}

export async function getMetodoElevacao() {
  const { data } = await api.get(`/filtros/metodos`, token());
  return data;
}

export async function getDataIdPoco(id: number) {
  const { data } = await api.get(`filtros/datas/${id}`, token());
  return data;
}
