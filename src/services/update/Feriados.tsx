// CRIADO EM: 24/10/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Feriados.

import { api, token } from "services/api";

export const updateFeriado = async (payload: any) =>
  await api.patch(`/feriados/${payload.id}`, payload, token());
