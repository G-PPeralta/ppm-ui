// CRIADO EM: 23/09/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Campanhas.

import { api, token } from "services/api";

export async function getCampanhasGantt(payload: any): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.post("/campanha/gantt", payload, token());

  return { data, status };
}
