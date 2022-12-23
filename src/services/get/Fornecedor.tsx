// import { FornecedoreDto } from "pages/ListaDosFornecedores";

import { api, token } from "services/api";

export async function getFornecedor(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get("/fornecedores", token());

  return { data, status };
}
