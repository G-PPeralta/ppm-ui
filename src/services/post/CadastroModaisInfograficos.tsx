import {
  CadastroTarefa,
  CadastroSonda,
  CadastroProjetoTipo,
  CadastroIntervencao,
  CadastroAtividade,
} from 'interfaces/CadastrosModaisInfograficos';

import { api } from 'services/api';

export async function postCadastroTarefa(
  payload: CadastroTarefa,
): Promise<{ status: number }> {
  const { status } = await api.post('/', payload);
  return { status };
}

export async function postCadastroSonda(
  payload: CadastroSonda,
): Promise<{ status: number }> {
  const { status } = await api.post('/sonda', payload);
  return { status };
}

export async function postCadastroIntervencao(
  payload: CadastroIntervencao,
): Promise<{ status: number }> {
  const { status } = await api.post('/intervencoes', payload);
  return { status };
}

export async function postCadastroAtividade(
  payload: CadastroAtividade,
): Promise<{ status: number }> {
  const { status } = await api.post('/atividades-intervencoes', payload);
  return { status };
}

export async function postProjetoTipo(
  payload: CadastroProjetoTipo,
): Promise<{ status: number }> {
  const { status } = await api.post('/', payload);
  return { status };
}
