import { Fornecedor } from 'interfaces/Services';

import { api } from 'services/api';

export async function putFornecedor(
  id: number,
  payload: Fornecedor,
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.put(`/fornecedor-temp/${id}`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { data, status };
}
