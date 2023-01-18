// CRIADO EM: 18/10/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) à curva S - Detalhamento do Projeto.

import { api, token } from "services/api";

export async function getCurvaSInfos(id: string | undefined): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos/previsXRealizadoProjeto/${id}`,
    token()
  );

  return { data, status };
}
