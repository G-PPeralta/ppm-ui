import { AllFeriados, Feriado, ProjetosFeriados } from "interfaces/Feriados";

import { api, token } from "services/api";

export async function getAllFeriados(): Promise<AllFeriados[]> {
  const response = await api.get("/feriados/range", token());

  return response.data;
}

export async function getFeriados(): Promise<Feriado[]> {
  const response = await api.get("/feriados", token());

  return response.data;
}

export async function getProjetosSelectFeriado(): Promise<ProjetosFeriados[]> {
  const response = await api.get("/projetos/chaves", token());

  return response.data;
}
