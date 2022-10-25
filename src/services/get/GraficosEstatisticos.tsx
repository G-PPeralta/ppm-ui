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

export async function getGraficoHistorico(params?: any): Promise<{
  data: any[];
  status: number;
}> {
  const { headers } = token();
  return api.get("graficos/historico", { params, headers });
}

export async function getGraficoPorCadaIntervencao(): Promise<{
  data: any[];
  status: number;
}> {
  return api.get("graficos/intervencao", token());
}

export async function getGraficoTempoPorSonda(): Promise<{
  data: any[];
  status: number;
}> {
  return api.get("graficos/tempo", token());
}

export async function getGraficoPorCadaSonda(): Promise<{
  data: any[];
  status: number;
}> {
  return api.get("graficos/sonda", token());
}

export async function getGraficoParaCIP(): Promise<{
  data: any[];
  status: number;
}> {
  return api.get("graficos/cpi", token());
}
