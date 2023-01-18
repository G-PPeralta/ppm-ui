// CRIADO EM: 07/09/2022
// AUTOR: Felipe Mateus
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Financeiro.

import {
  Budget,
  ClasseServico,
  CustoDiario,
  Realizado,
  Result,
} from "interfaces/Budgets";

import { api, token } from "services/api";

export async function getBudgets(): Promise<Budget[]> {
  const uri = "/budgets";

  const { data } = await api.get<Budget[]>(uri, token());
  return data;
}

export async function getBudgetDetail(id: string | null): Promise<Result> {
  const uri = `/budgets/detail/${id}`;
  const { data } = await api.get<Result>(uri, token());

  return data;
}

export async function getBudgetProjects(): Promise<
  { nome: string; id: number }[]
> {
  const uri = "/budgets/projects";
  const { data } = await api.get<{ nome: string; id: number }[]>(uri, token());
  return data;
}

export async function getClassesServicos() {
  const uri = "/classe-servico";
  const { data } = await api.get<ClasseServico[]>(uri, token());
  return { data };
}

export async function getCustoDiarioFilho(
  id: number | undefined,
  startDate: string | Date | null,
  endDate: string | Date | null
): Promise<CustoDiario[]> {
  const uri = `/budgets/custoDiario/filho/${id}`;
  const { data } = await api.post(uri, { startDate, endDate }, token());
  return data;
}

export async function getCustoDiarioPai(
  id: number | undefined,
  startDate: string | Date | null,
  endDate: string | Date | null
): Promise<CustoDiario[]> {
  const uri = `/budgets/custoDiario/pai/${id}`;

  const { data } = await api.post(uri, { startDate, endDate }, token());

  return data;
}

export async function getCustoRealizado(id: number): Promise<Realizado> {
  const uri = `/budgets/custoDiario/${id}`;

  const { data } = await api.get(uri, token());

  return data;
}
