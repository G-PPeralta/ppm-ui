// CRIADO EM: 28/09/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) para criação de uma nova tarefa.

import { TarefaAtividade } from "interfaces/Services";

import { api, token } from "services/api";

export async function postTarefa(
  payload: TarefaAtividade
): Promise<{ data: TarefaAtividade; status: number }> {
  const { data, status } = await api.post("/tarefas", payload, token());

  return { data, status };
}
