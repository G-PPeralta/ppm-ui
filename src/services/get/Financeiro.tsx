// CRIADO EM: 04/10/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Financeiro.

import { FinanceiroPorProjetos } from "interfaces/FinanceiroProjetos";

import { api, token } from "services/api";

export async function getFinanceiroPorProjetos(): Promise<{
  data: FinanceiroPorProjetos[];
  status: number;
}> {
  const { data, status } = await api.get("/projetos-financeiro/pai", token());

  return { data, status };
}

export async function getCentroDeCustoProjetos(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos-financeiro/filhos/${id}/`,
    token()
  );

  return { data, status };
}

export async function getFornecedores(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/fornecedores", token());

  return { data, status };
}

export async function getFornecedoresById(id: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/fornecedores/${id}`, token());

  return { data, status };
}

export async function getClassesDeServico(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/classe-servico", token());

  return { data, status };
}
