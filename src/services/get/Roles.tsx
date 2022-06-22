import { ResponseRoles } from 'interfaces/Services';

import { api } from 'services/api';

export async function getRoles(): Promise<{
  data: ResponseRoles[];
  status: number;
}> {
  const { data, status } = await api.get(`/roles`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
