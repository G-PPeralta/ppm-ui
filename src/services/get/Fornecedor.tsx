import { Fornecedor } from 'interfaces/Services';

import { api } from 'services/api';

export async function getFornecedor(): Promise<{
  data: Fornecedor[];
  status: number;
}> {
  const { data, status } = await api.get('/fornecedor-temp', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
