import {
  AtividadesLookahead,
  FerramentasAtividade,
  ProjetosLookahead,
  ServicosAtividade,
} from "interfaces/lookahead";

import { api, token } from "services/api";

export async function getProjetosAtividades(): Promise<ProjetosLookahead[]> {
  const { data } = await api.get("/lookahead/projetos", token());
  return data;
}

export async function getAtividades(
  id: number
): Promise<AtividadesLookahead[]> {
  const { data } = await api.get(`/lookahead/atividades/${id}`, token());
  return data;
}

export async function getAtividade(id: number): Promise<AtividadesLookahead> {
  const { data } = await api.get(
    `/lookahead/ferramentas-servicos/${id}`,
    token()
  );
  return data;
}

export async function getFerramentas(
  id: number
): Promise<FerramentasAtividade[]> {
  const { data } = await api.get(`/atividade-ferramentas/${id}`, token());
  return data;
}

export async function getServicos(id: number): Promise<ServicosAtividade[]> {
  const { data } = await api.get(`/atividade-servicos/${id}`, token());
  return data;
}
