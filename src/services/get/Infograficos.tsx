import {
  AreaAtuacao,
  AtividadeLista,
  RegistroResponsavel,
} from 'interfaces/Services';

import { api } from 'services/api';

export async function getInfoCampanha(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(`/campanha`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getResponsavelList(): Promise<{
  data: RegistroResponsavel[];
  status: number;
}> {
  const { data, status } = await api.get(`/responsavel`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getAreaAtuacaoList(): Promise<{
  data: AreaAtuacao[];
  status: number;
}> {
  const { data, status } = await api.get(`/area-atuacao`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getAtividadesList(): Promise<{
  data: AtividadeLista[];
  status: number;
}> {
  const { data, status } = await api.get(`/atividades-intervencoes`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
