import { TotalProjetosDashboard } from "interfaces/Services";

import { api } from "services/api";

export async function getTotalProjetos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/total-projetos", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getOrcamentoTotal(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/orcamento-total", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getTotalRealizado(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/realizado", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getTotalNaoPrevisto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/nao-previsto", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getAreasDemandadas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/solicitantes", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getProjetosInfo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/projetos-info", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getProjetosPrevistoRealizado(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/projetos/previstoXRealizado", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getGates(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/gates", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getTotalProjetosMes(): Promise<{
  data: TotalProjetosDashboard[];
  status: number;
}> {
  const { data, status } = await api.get("/dashboard/total-projetos-mes", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getDadosCurvaSGeral(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/projetos/curva-s", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
