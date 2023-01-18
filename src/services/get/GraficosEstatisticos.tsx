// CRIADO EM: 04/10/2022
// AUTOR: Magno Ferreira
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Gráficos Estatísticos.

import { api, token } from "services/api";

export async function getSondas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/sonda", token());

  return { data, status };
}

export async function getOperacoes(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get("projetos-atividades/find/operacoes");

  return { data, status };
}

export async function getLabelHistorico(): Promise<{
  data: any[];
  status: number;
}> {
  return api.get("graficos/total", token());
}

export async function getGraficoHistorico(params?: any): Promise<{
  data: any[];
  status: number;
}> {
  const { headers } = token();
  return api.get("graficos/historico", { params, headers });
}

export async function getGraficoPorCadaIntervencao(params?: any): Promise<{
  data: any[];
  status: number;
}> {
  const { headers } = token();
  return api.get("graficos/intervencao", { params, headers });
}

export async function getGraficoTempoPorSonda(params?: any): Promise<{
  data: any[];
  status: number;
}> {
  const { headers } = token();
  return api.get("graficos/tempo", { params, headers });
}

export async function getGraficoPorCadaSonda(params?: any): Promise<{
  data: any[];
  status: number;
}> {
  const { headers } = token();
  return api.get("graficos/sonda", { params, headers });
}

export async function getGraficoParaCIP(params?: any): Promise<{
  data: any[];
  status: number;
}> {
  const { headers } = token();
  return api.get("graficos/cpi", { params, headers });
}
