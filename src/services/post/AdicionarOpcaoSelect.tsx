// CRIADO EM: 11/08/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) para criação de novos itens.

import {
  Polo,
  LocalProjeto,
  Solicitante,
  StatusProjeto,
  Divisao,
  Classificacao,
  TipoProjeto,
  Gate,
} from "interfaces/Services";

import { api, token } from "services/api";

export async function postNovoPolo(payload: Polo): Promise<{ status: number }> {
  const { status } = await api.post("/polo", payload, token());
  return { status };
}

export async function postNovoLocalProjeto(
  payload: LocalProjeto
): Promise<{ status: number }> {
  const { status } = await api.post("/local", payload, token());
  return { status };
}

export async function postNovoSolicitante(
  payload: Solicitante
): Promise<{ status: number }> {
  const { status } = await api.post("/solicitante", payload, token());
  return { status };
}

export async function postNovoStatusProjeto(
  payload: StatusProjeto
): Promise<{ status: number }> {
  const { status } = await api.post("/status-projeto", payload, token());
  return { status };
}

export async function postNovaDivisao(
  payload: Divisao
): Promise<{ status: number }> {
  const { status } = await api.post("/divisao", payload, token());
  return { status };
}

export async function postNovaClassificacao(
  payload: Classificacao
): Promise<{ status: number }> {
  const { status } = await api.post("/classificacao", payload, token());
  return { status };
}

export async function postNovoTipoProjeto(
  payload: TipoProjeto
): Promise<{ status: number }> {
  const { status } = await api.post("/tipo-projeto", payload, token());
  return { status };
}

export async function postNovoGate(payload: Gate): Promise<{ status: number }> {
  const { status } = await api.post("/gate", payload, token());
  return { status };
}
