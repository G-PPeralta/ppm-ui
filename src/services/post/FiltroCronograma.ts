import { FiltroCronograma } from "interfaces/FiltroCronograma";
import { api } from "services/api";

export async function postFiltroCronograma(payload: FiltroCronograma) {
  const { data } = await api.post(`/filtros`, payload);
  return data;
}
