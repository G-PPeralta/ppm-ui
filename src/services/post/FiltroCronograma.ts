import { FiltroCronograma } from "interfaces/FiltroCronograma";

import { api } from "services/api";

export async function postFiltroCronograma(payload: FiltroCronograma) {
  const response = await api.post("/filtros", payload);
  return response.data;
}
