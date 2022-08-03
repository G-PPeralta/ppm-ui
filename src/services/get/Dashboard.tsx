import { api } from 'services/api';

export async function getTotalProjetos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/dashboard/total-projetos', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
