import { api } from "services/api";

export async function getInitialRaking(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/projetos-ranking/find/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
