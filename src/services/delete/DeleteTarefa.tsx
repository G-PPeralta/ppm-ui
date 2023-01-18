// CRIADO EM: 21/09/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Carteira de Projetos.

import { api, token } from "services/api";

export async function deleteTarefa(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/tarefas/${id}/${user}`, token());

  return { data, status };
}
