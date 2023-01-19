// CRIADO EM: 23/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Cronogramas.

import { FiltroCronograma } from "interfaces/FiltroCronograma";

import { api, token } from "services/api";

export async function postFiltroCronograma(payload: FiltroCronograma) {
  const response = await api.post("/filtros", payload, token());
  return response.data;
}

export async function postFiltroDuracaoMedia(payload: FiltroCronograma) {
  const response = await api.post("/filtros/duracao", payload, token());
  return response.data;
}
