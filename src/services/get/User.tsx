import { ResponsePermissions } from "interfaces/Services";

import { api } from "services/api";

export async function getUserPending(
  id: string
): Promise<{ data: ResponsePermissions[]; status: number }> {
  const { data, status } = await api.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
