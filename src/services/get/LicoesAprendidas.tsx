import { LicoesAprendidas } from "interfaces/Services";

import { api } from "services/api";

export async function getLicoesAprendidas(id: string): Promise<{
  data: LicoesAprendidas[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos-atividades-licoes-aprendidas/${id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
      },
    }
  );

  return { data, status };
}
