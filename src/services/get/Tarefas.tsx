import { TarefaAtividade } from "interfaces/Services";

import { api, token } from "services/api";

export async function getAtividadesTarefas(): Promise<{
  data: TarefaAtividade[];
  status: number;
}> {
  const { data, status } = await api.get("/tarefas", token());

  return { data, status };
}
