import { api, token } from 'services/api';

export async function getSondas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/sonda', token());

  return { data, status };
}
