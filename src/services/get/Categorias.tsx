// CRIADO EM: 27/09/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) às categorias - Projetos.

import { Categorias } from "interfaces/Services";

import { api, token } from "services/api";

export async function getCategorias(): Promise<{
  data: Categorias[];
  status: number;
}> {
  const { data, status } = await api.get("/categorias", token());

  return { data, status };
}
