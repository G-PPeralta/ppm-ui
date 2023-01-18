// CRIADO EM: 26/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) ao Centro de Custo.

import { api, token } from "services/api";

export async function getDataInicialFinalProjeto(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/centro-custo/datas/${id}`, token());

  return { data, status };
}
