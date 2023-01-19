// CRIADO EM: 23/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) aos elementos da tela de Projetos.

import {
  Coordenador,
  CoordenadorRetorno,
  Responsavel,
  ResponsavelRetorno,
} from "interfaces/Services";

import { api, token } from "services/api";

export async function postProject(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/projetos/registro", payload, token());
  return { status };
}

export async function postResponsavel(
  payload: Responsavel
): Promise<{ data: ResponsavelRetorno; status: number }> {
  const { data, status } = await api.post("/responsavel", payload, token());
  return { data, status };
}

export async function postCoordenador(
  payload: Coordenador
): Promise<{ data: CoordenadorRetorno; status: number }> {
  const { data, status } = await api.post("/coordenador", payload, token());
  return { data, status };
}
