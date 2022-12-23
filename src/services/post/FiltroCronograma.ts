import { FiltroCronograma } from "interfaces/FiltroCronograma";

import { api, token } from "services/api";

export async function postFiltroCronograma(payload: FiltroCronograma) {
  const response = await api.post("/filtros", payload, token());
  return response.data;
}

export async function postFiltroDuracaoMedia(payload: FiltroCronograma) {
  const response = await api.post("/filtros/duracao", payload, token());
  return response.data;
}
