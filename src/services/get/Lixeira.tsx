import { Lixeira } from "interfaces/Lixeira";

import { api, token } from "services/api";

export async function getLixeira(): Promise<{
  data: Lixeira[];
  status: number;
}> {
  const { data, status } = await api.get(`/lixeira`, token());

  return { data, status };
}
