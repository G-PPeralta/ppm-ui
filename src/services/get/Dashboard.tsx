import { TotalProjetosDashboard } from "interfaces/Services";

import { api, token } from "services/api";

export async function getRanking(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    "/dashboard/prioridades-complexidades",
    token()
  );

  return { data, status };
}

export async function getTotalProjetos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/total-projetos", token());

  return { data, status };
}

export async function getOrcamentoTotal(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/orcamento-total", token());

  return { data, status };
}

export async function getTotalRealizado(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/realizado", token());

  return { data, status };
}

export async function getTotalNaoPrevisto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/nao-previsto", token());

  return { data, status };
}

export async function getAreasDemandadas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/solicitantes", token());

  return { data, status };
}

export async function getProjetosInfo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/projetos-info", token());

  return { data, status };
}

export async function getProjetosPrevistoRealizado(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    "/projetos/previstoXRealizado",
    token()
  );

  return { data, status };
}

export async function getGates(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/gates", token());

  return { data, status };
}

export async function getTotalProjetosMes(): Promise<{
  data: TotalProjetosDashboard[];
  status: number;
}> {
  const { data, status } = await api.get(
    "/dashboard/total-projetos-mes",
    token()
  );

  return { data, status };
}

export async function getDadosCurvaSGeral(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/projetos/curva-s", token());

  return { data, status };
}
