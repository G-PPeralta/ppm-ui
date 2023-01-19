// CRIADO EM: 24/10/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Tarefa.

import { api, token } from "services/api";

export async function patchTarefa(
  id: number,
  campo: any,
  payload: string | number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/tarefas/${id}/${campo}/${payload}/${user}`,
    token()
  );

  return { data, status };
}
