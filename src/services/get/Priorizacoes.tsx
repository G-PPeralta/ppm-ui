// import { ProjetosRanking } from "interfaces/Services";

import { api } from "services/api";

export async function getPriorizacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/rankings", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
