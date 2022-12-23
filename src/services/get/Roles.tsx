import { ResponseRoles } from "interfaces/Services";

import { api, token } from "services/api";

export async function getRoles(): Promise<{
  data: ResponseRoles[];
  status: number;
}> {
  const { data, status } = await api.get(`/roles`, token());

  return { data, status };
}
