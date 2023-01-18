// CRIADO EM: 23/09/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) aos elementos da tela de Projetos.

import { ProjetosConfig, ProjetosList } from "interfaces/Services";

import { api, token } from "services/api";

export async function getProjetos(): Promise<{
  data: ProjetosList[];
  status: number;
}> {
  const { data, status } = await api.get("/projetos/listagem", token());

  return { data, status };
}

export async function getProjeto(id: number): Promise<{
  data: ProjetosConfig[];
  status: number;
}> {
  const { data, status } = await api.get(
    `/projetos/configuracoes/${id}`,
    token()
  );

  return { data, status };
}

export async function getTipoResponsavel(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/tipo-responsavel", token());

  return { data, status };
}

export async function getClassificacao(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/classificacao", token());

  return { data, status };
}

export async function getPolo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/polo", token());

  return { data, status };
}

export async function getSolicitante(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/solicitante", token());

  return { data, status };
}

export async function getPrioridade(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/prioridade", token());

  return { data, status };
}

export async function getComplexidade(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/complexidade", token());

  return { data, status };
}

export async function getResponsaveisProjetos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/responsavel/projetos/p", token());

  return { data, status };
}

export async function getLocalProjeto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/local", token());

  return { data, status };
}

export async function getDivisao(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/divisao", token());

  return { data, status };
}

export async function getStatusProjeto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/status-projeto", token());

  return { data, status };
}

export async function getGate(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/gate", token());

  return { data, status };
}

export async function getTipoProjeto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/tipo-projeto", token());

  return { data, status };
}

export async function getDemanda(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/demanda", token());

  return { data, status };
}

export async function getAtividadesRelacaoByProjetoId(id?: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/projetos/relacoes/${id}`, token());

  return { data, status };
}

export async function getAreaResponsavel(): Promise<any> {
  const response = await api.get("/area-responsavel ", token());

  return response.data;
}

export async function getRelacoesExecucao(id: number | string): Promise<any> {
  const response = await api.get(`/projetos/relacoesexecucao/${id}`, token());

  return response.data;
}

export async function getIdOrigem(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/projetos/gerar/ids", token());

  return { data, status };
}

export async function getAreaResponsavel2(): Promise<any> {
  const { data, status } = await api.get("/area-responsavel ", token());

  return { data, status };
}
