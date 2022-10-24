// import { AtividadesProjeto } from "interfaces/Services";

import { api } from "services/api";

export async function getOperacoes(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get("projetos-atividades/find/operacoes");

  return { data, status };
}
