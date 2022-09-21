import { ResponseUserPending } from "interfaces/Services";

import { api } from "services/api";

export async function getPending(): Promise<{
  data: ResponseUserPending[];
  status: number;
}> {
  const { data, status } = await api.get("/user/pending", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
