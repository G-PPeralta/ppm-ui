// CRIADO EM: 14/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Campanhas

import { api, token } from "services/api";

export async function deleteInfograficos(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/campanha/${id}/${user}`, token());

  return { data, status };
}
