import {
  Coordenador,
  CoordenadorRetorno,
  RegisterProjectProps,
  Responsavel,
  ResponsavelRetorno,
} from "interfaces/Services";

import { api } from "services/api";

export async function postProject(
  payload: RegisterProjectProps
): Promise<{ status: number }> {
  const { status } = await api.post("/projetos/registro", payload);
  return { status };
}

export async function postResponsavel(
  payload: Responsavel
): Promise<{ data: ResponsavelRetorno; status: number }> {
  const { data, status } = await api.post("/responsavel", payload);
  return { data, status };
}

export async function postCoordenador(
  payload: Coordenador
): Promise<{ data: CoordenadorRetorno; status: number }> {
  const { data, status } = await api.post("/coordenador", payload);
  return { data, status };
}
