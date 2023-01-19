// CRIADO EM: 10/01/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: CRUD vinculado à tela de Campanhas.

import { api, token } from "services/api";

export const postNovaCampanhaRQ: any = async (payload: any) =>
  await api.post("/campanha/pai", payload, token());
