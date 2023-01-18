// CRIADO EM: 04/10/2022
// AUTOR: Maxwell
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Projetos.

import { Projetos } from "interfaces/Projetos";

import { api, token } from "services/api";

export async function getProjects(polo: string = ""): Promise<any[]> {
  let uri = "/dashboard/projetos-info";

  if (polo == "1") {
    uri = "/dashboard/projetos-info-tucano";
  } else if (polo == "2") {
    uri = "/dashboard/projetos-info-alagoas";
  }
  const { data } = await api.get<any[]>(uri, token());
  return data;
}

export async function getProjetos(): Promise<Projetos[]> {
  const uri = "/projetos/detalhados";
  const { data } = await api.get<Projetos[]>(uri, token());
  return data;
}
