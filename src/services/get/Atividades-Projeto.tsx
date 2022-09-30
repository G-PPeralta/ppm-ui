import { AtividadesProjeto } from "interfaces/Services";

import { api } from "services/api";

export async function getAtividadesProjeto(): Promise<{
  data: AtividadesProjeto[];
  status: number;
}> {
  const { data, status } = await api.get("/atividades-projetos");

  return { data, status };
}
