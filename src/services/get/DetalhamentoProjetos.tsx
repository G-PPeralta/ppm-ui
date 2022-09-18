import { api } from "services/api";

export async function getInfoProjetos(id: string): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/detalhamento/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
