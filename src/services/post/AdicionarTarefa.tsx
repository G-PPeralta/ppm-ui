import { TarefaAtividade } from "interfaces/Services";

import { api, token } from "services/api";

export async function postTarefa(
  payload: TarefaAtividade
): Promise<{ data: TarefaAtividade; status: number }> {
  const { data, status } = await api.post("/tarefas", payload, token());

  return { data, status };
}
