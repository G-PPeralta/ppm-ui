import { ResponseUserPending } from "interfaces/Services";

import { api, token } from "services/api";

export async function getPending(): Promise<{
  data: ResponseUserPending[];
  status: number;
}> {
  const { data, status } = await api.get("/user/pending", token());

  return { data, status };
}
