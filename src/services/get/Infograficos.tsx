import { api } from 'services/api';

export async function getInfoCampanha(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
