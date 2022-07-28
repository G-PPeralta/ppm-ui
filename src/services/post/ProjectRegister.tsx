import { RegisterProjectProps } from 'interfaces/Services';

import { api } from 'services/api';

export async function postProject(
  payload: RegisterProjectProps,
): Promise<{ status: number }> {
  const { status } = await api.post('/projects-registration', payload);
  return { status };
}