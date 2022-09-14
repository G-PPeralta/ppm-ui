import {
  Coordenador,
  RegisterProjectProps,
  Responsavel,
} from 'interfaces/Services';

import { api } from 'services/api';

export async function postProject(
  payload: RegisterProjectProps,
): Promise<{ status: number }> {
  const { status } = await api.post('/projetos/registro', payload);
  return { status };
}

export async function postResponsavel(
  payload: Responsavel,
): Promise<{ status: number }> {
  const { status } = await api.post('/responsavel', payload);
  return { status };
}

export async function postCoordenador(
  payload: Coordenador,
): Promise<{ status: number }> {
  const { status } = await api.post('/coordenador', payload);
  return { status };
}
