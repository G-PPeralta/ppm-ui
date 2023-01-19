// CRIADO EM: 23/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Priorização Diretores.

import { api, token } from "services/api";

export async function getPriorizacaoDiretores() {
  const { data, status } = await api.get("/priorizacoes", token());
  return { data, status };
}

export async function postPriorizacaoDiretores(payload: any) {
  const { status } = await api.post("/priorizacoes", payload, token());
  return { status };
}
