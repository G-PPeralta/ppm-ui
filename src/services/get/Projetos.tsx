import { api } from 'services/api';

export async function getTipoResponsavel(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/tipo-responsavel', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getClassificacao(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/classificacao', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getPolo(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/polo', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getSolicitante(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/solicitante', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getPrioridade(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/prioridade', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getComplexidade(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/complexidade', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getStatusProjeto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/status-projeto', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}

export async function getTipoProjeto(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get('/tipo-projeto', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    },
  });

  return { data, status };
}
