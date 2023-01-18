// CRIADO EM: 23/09/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Tarefas.

import { TarefaAtividadeComId } from "interfaces/Services";

import { api, token } from "services/api";

export async function getAtividadesTarefas(id: number): Promise<{
  data: TarefaAtividadeComId[];
  status: number;
}> {
  const { data, status } = await api.get(`/tarefas/projeto/${id}`, token());

  return { data, status };
}
