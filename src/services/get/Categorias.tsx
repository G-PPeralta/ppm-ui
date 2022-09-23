import { Categorias } from "interfaces/Services";

import { api, token } from "services/api";

export async function getCategorias(): Promise<{
  data: Categorias[];
  status: number;
}> {
  const { data, status } = await api.get("/categorias", token());

  return { data, status };
}
