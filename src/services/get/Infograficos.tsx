import {
  AreaAtuacao,
  Responsavel,
} from "interfaces/CadastrosModaisInfograficos";
import { Projetos } from "interfaces/Projetos";
import { AtividadeLista, Tarefa } from "interfaces/Services";

import { api, token } from "services/api";

export async function postGetInfoCampanha(
  payload: any
): Promise<{ data: any[]; status: number }> {
  const { data, status } = await api.post("/campanha", payload);
  return { data, status };
}

// ROTA NÃO EXISTE MAIS. SUBSTITUIDA POR POR #POST EM /campanha
// export async function getInfoCampanha(): Promise<{
//   data: any[];
//   status: number;
// }> {
//   const { data, status } = await api.get(`/campanha`, token());

//   return { data, status };
// }

export async function getInfoProjetos(): Promise<{
  data: Projetos[];
}> {
  const { data } = await api.get(`/projetos/detalhados`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("@Origem:token")}`,
    },
  });

  return { data };
}

export async function getResponsavelList(): Promise<{
  data: Responsavel[];
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

export async function getSondaCampanha(): Promise<{
  data: any[];
  status: number;
}> {
  const { data, status } = await api.get(`/campanha/find`, token());

  return { data, status };
}
