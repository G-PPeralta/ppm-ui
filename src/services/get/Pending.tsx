import { api } from 'services/api';

export async function getPending() {
  const { data, status } = await api.get('/user/pending', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
