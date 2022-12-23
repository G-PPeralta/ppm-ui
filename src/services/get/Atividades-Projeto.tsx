import { AtividadesProjeto } from "interfaces/Services";

import { api, token } from "services/api";

export async function getAtividadesProjeto(id: number): Promise<{
  data: AtividadesProjeto[];
  status: number;
}> {
  const { data, status } = await api.get(`/atividades-projetos/${id}`, token());

  return { data, status };
}
