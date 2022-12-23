import { ResponsePermissions } from "interfaces/Services";

import { api, token } from "services/api";

export async function getUserPending(
  id: string
): Promise<{ data: ResponsePermissions[]; status: number }> {
  const { data, status } = await api.get(`/user/${id}`, token());

  return { data, status };
}
