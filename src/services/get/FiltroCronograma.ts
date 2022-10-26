import { api } from "services/api";

export async function getSondas() {
  const { data } = await api.get(`/filtros/sondas`);
  return data;
}

export async function getPocos() {
  const { data } = await api.get(`/filtros/pocos`);
  return data;
}

export async function getMetodoElevacao() {
  const { data } = await api.get(`/filtros/metodos`);
  return data;
}

export async function getDataIdPoco(id: number) {
  const { data } = await api.get(`filtros/datas/${id}`);
  return data;
}
