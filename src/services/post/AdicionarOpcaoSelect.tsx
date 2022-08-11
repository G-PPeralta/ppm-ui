import {
  Polo,
  LocalProjeto,
  Solicitante,
  StatusProjeto,
  Divisao,
  Classificacao,
} from 'interfaces/Services';

import { api } from 'services/api';

export async function postNovoPolo(payload: Polo): Promise<{ status: number }> {
  const { status } = await api.post('/polo', payload);
  return { status };
}

export async function postNovoLocalProjeto(
  payload: LocalProjeto,
): Promise<{ status: number }> {
  const { status } = await api.post('/local', payload);
  return { status };
}

export async function postNovoSolicitante(
  payload: Solicitante,
): Promise<{ status: number }> {
  const { status } = await api.post('/solicitante', payload);
  return { status };
}

export async function postNovoStatusProjeto(
  payload: StatusProjeto,
): Promise<{ status: number }> {
  const { status } = await api.post('/status-projeto', payload);
  return { status };
}

export async function postNovaDivisao(
  payload: Divisao,
): Promise<{ status: number }> {
  const { status } = await api.post('/divisao', payload);
  return { status };
}

export async function postNovaClassificacao(
  payload: Classificacao,
): Promise<{ status: number }> {
  const { status } = await api.post('/classificacao', payload);
  return { status };
}
