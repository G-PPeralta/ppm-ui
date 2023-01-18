// CRIADO EM: 30/12/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculada(s) à tela de Campanha.

import { api, token } from "services/api";

export async function deleteCampanha(
  idCampanha: number,
  idAtividade: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/campanha/delete/${idCampanha}/${idAtividade}`,
    token()
  );

  return { data, status };
}
