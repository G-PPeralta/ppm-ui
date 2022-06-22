import { RegisterProps, ResponseLogin } from 'interfaces/Services';

import { api } from 'services/api';

export async function postRegister(
  payload: RegisterProps,
): Promise<{ data: ResponseLogin; status: number }> {
  const { data, status } = await api.post('/user', payload);

  return { data, status };
}
