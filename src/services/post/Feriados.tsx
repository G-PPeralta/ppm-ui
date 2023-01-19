// CRIADO EM: 21/10/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Feriados.

import { api, token } from "services/api";

export const postCadastroFeriado = async (feriado: any) =>
  await api.post("/feriados", feriado, token());
