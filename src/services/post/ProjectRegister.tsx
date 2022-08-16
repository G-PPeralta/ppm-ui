import {
  RegisterProjectProps,
  RegistroCoordenador,
  Responsaveis,
} from 'interfaces/Services';

import { api } from 'services/api';

export async function postProject(
  payload: RegisterProjectProps,
): Promise<{ status: number }> {
  const { status } = await api.post('/projetos/registro', payload);
  return { status };
}

export async function postResponsavel(
  payload: Responsaveis,
): Promise<{ status: number }> {
  const { status } = await api.post('/responsavel', payload);
  return { status };
}

export async function postCoordenador(
  payload: RegistroCoordenador[],
): Promise<{ status: number }> {
  const { status } = await api.post('/coordenador', payload);
  return { status };
}
