import { CpiSpi, InfoFinanceira, ProjetoProgresso } from "interfaces/Services";

import { api } from "services/api";

export async function getInfoProjetos(id: string): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/detalhamento/${id}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getProgressoProjeto(): Promise<{
  data: ProjetoProgresso[];
  status: number;
}> {
  const { data, status } = await api.get(`/detalhamento/progresso`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}

export async function getInfoFinanceiro(id: string): Promise<{
  data: InfoFinanceira[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/detalhamento/info-financeiro/${id}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
      },
    }
  );

  return { data, status };
}

export async function getCPiSPi(): Promise<{
  data: CpiSpi[];
  status: number;
}> {
  const { data, status } = await api.get(`/detalhamento/cpi-spi/443}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data, status };
}
