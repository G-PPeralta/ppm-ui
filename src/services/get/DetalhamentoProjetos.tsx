// CRIADO EM: 04/10/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos do Detalhamento de Projetos.

import { CpiSpi, InfoFinanceira, ProjetoProgresso } from "interfaces/Services";

import { api, token } from "services/api";

export async function getInfoProjetos(id: string): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/detalhamento/${id}`, token());

  return { data, status };
}

export async function getProgressoProjeto(id: number): Promise<{
  data: ProjetoProgresso[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/detalhamento/progresso/${id}`,
    token()
  );

  return { data, status };
}

export async function getInfoFinanceiro(id: string): Promise<{
  data: InfoFinanceira[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/detalhamento/info-financeiro/${id}`,
    token()
  );

  return { data, status };
}

export async function getCPiSPi(id: number): Promise<{
  data: CpiSpi[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/detalhamento/cpi-spi/${id}`,
    token()
  );

  return { data, status };
}
