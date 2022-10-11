import { Ranking } from "interfaces/Ranking";
import { ProjetosRanking } from "interfaces/Services";

import { api } from "services/api";

export async function getProjetosRanking(): Promise<{
  data: ProjetosRanking;
  status: number;
}> {
  const { data, status } = await api.get("/projetos-ranking", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getRanking(id: number): Promise<Ranking[]> {
  const { data } = await api.get(`projetos-ranking/find/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return data;
}
