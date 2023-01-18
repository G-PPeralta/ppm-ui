import { api, token } from "services/api";

// CRIADO EM: 29/11/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculada(s) ao Gantt do Cronograma.

export async function deleteAtividadeGanttCampanha(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/campanha/${id}/${user}`, token());

  return { data, status };
}
