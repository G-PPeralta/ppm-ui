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

export async function getOpcoesRankings(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/rankings-opcoes/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
