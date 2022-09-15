import {
  AreaAtuacao,
  AtividadeLista,
  RegistroResponsavel,
  Tarefa,
} from 'interfaces/Services';

import { api, token } from 'services/api';

export async function getInfoCampanha(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha`, token());

  return { data, status };
}

export async function getResponsavelList(): Promise<{
  data: RegistroResponsavel[];
  status: number;
}> {
  const { data, status } = await api.get(`/responsavel`, token());

  return { data, status };
}

export async function getAreaAtuacaoList(): Promise<{
  data: AreaAtuacao[];
  status: number;
}> {
  const { data, status } = await api.get(`/area-atuacao`, token());

  return { data, status };
}

export async function getAtividadesList(): Promise<{
  data: AtividadeLista[];
  status: number;
}> {
  const { data, status } = await api.get(`/atividades-intervencoes`, token());

  return { data, status };
}

export async function getTarefaList(): Promise<{
  data: Tarefa[];
  status: number;
}> {
  const { data, status } = await api.get(`/tarefa`, token());

  return { data, status };
}
