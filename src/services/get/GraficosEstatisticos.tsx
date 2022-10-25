import { api, token } from "services/api";

export async function getOperacoes(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get("projetos-atividades/find/operacoes");

  return { data, status };
}

export async function getGraficoHistorico(): Promise<{
  data: any[];
  status: number;
}> {
  return api.get("graficos/historico", token());
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
