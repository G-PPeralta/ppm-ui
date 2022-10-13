import { TarefaAtividadeComId } from "interfaces/Services";

import { api, token } from "services/api";

export async function getAtividadesTarefas(id: number): Promise<{
  data: TarefaAtividadeComId[];
  status: number;
}> {
  const { data, status } = await api.get(`/tarefas/projeto/${id}`, token());

  return { data, status };
}
