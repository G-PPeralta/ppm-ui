// CRIADO EM: 10/01/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: CRUD vinculado à tela de Campanhas - sondas.

import { api, token } from "services/api";

export const postCadastroSondaOperacaoRQ: any = async (payload: any) =>
  await api.post("/nova-operacao/sonda", payload, token());

export const getAllSondasOperacaoRQ = async () => {
  const { data } = await api.get("/servicos-sonda-poco/sondas", token());
  return data;
};
