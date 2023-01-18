// CRIADO EM: 27/09/2022
// AUTOR: Magno
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Cronogramas - Operações.

import { api, token } from "services/api";

export async function getOperacoesEstatisticas(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get(`/estatisticas/projetos`, token());

  return { data, status };
}
