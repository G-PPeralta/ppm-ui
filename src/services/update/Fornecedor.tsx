import { Fornecedor } from "interfaces/Services";

import { api, token } from "services/api";

export async function putFornecedor(
  id: number,
  payload: Fornecedor
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.put(
    `/fornecedor-temp/${id}`,
    payload,
    token()
  );

  return { data, status };
}
