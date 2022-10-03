import { TarefaAtividadeComId } from "interfaces/Services";

import { api, token } from "services/api";

export async function getAtividadesTarefas(): Promise<{
  data: TarefaAtividadeComId[];
  status: number;
}> {
  const { data, status } = await api.get("/tarefas", token());

  return { data, status };
}
