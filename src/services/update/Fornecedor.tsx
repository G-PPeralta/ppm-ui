// import { Fornecedor } from "interfaces/Services";

// import { FornecedoreDto } from "pages/ListaDosFornecedores";

import { api, token } from "services/api";

export async function putFornecedor(
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(`/fornecedores`, payload, token());

  return { data, status };
}
