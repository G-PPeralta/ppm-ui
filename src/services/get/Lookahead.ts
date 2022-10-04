import {
  AtividadesLookahead,
  FerramentasAtividade,
  ProjetosLookahead,
  ServicosAtividade,
} from "interfaces/lookahead";

import { api, token } from "services/api";

export async function getProjetosAtividades(): Promise<{
  data: ProjetosLookahead[];
}> {
  const { data } = await api.get("/lookahead/projetos", token());
  return data;
}

export async function getAtividades(id: string): Promise<{
  data: AtividadesLookahead[];
}> {
  const { data } = await api.get(`/lookahead/atividades/${id}`, token());
  return data;
}

export async function getFerramentas(): Promise<{
  data: FerramentasAtividade[];
}> {
  const { data } = await api.get(`/atividade-ferramentas`, token());
  return data;
}

export async function getServicos(): Promise<{
  data: ServicosAtividade[];
}> {
  const { data } = await api.get(`/atividade-servicos`, token());
  return data;
}
