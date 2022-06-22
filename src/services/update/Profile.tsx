import { RegisterProps, ResponseLogin } from 'interfaces/Services';

import { api } from 'services/api';

export async function putProfile(
  id: string,
  payload: RegisterProps,
): Promise<{ data: ResponseLogin; status: number }> {
  const { data, status } = await api.put(`/user/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
