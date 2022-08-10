import { api } from 'services/api';

export async function getTotalProjetos(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/dashboard/total-projetos', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getOrcamentoTotal(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/dashboard/orcamento-total', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getAreasDemandadas(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/dashboard/areas-demandadas', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getProjetosInfo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/dashboard/projetos-info', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
