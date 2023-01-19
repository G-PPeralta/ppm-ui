// CRIADO EM: 23/09/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela de Campanhas.

import {
  CadastroTarefa,
  CadastroProjetoTipo,
  CadastroIntervencao,
  CadastroAtividade,
  NovaCampanha,
  NovaIntervencao,
  NovoPoco,
  NovaSonda,
  NovaAtividade,
} from "interfaces/CadastrosModaisInfograficos";

import { api, token } from "services/api";

export async function postCadastroTarefa(
  payload: CadastroTarefa
): Promise<{ status: number }> {
  const { status } = await api.post("/tarefas", payload, token());
  return { status };
}

export async function postNovaSonda(
  payload: NovaSonda
): Promise<{ status: number }> {
  const { status } = await api.post("/sonda", payload, token());
  return { status };
}

export async function postCadastroIntervencao(
  payload: CadastroIntervencao
): Promise<{ status: number }> {
  const { status } = await api.post("/intervencoes", payload, token());
  return { status };
}

export async function postCadastroAtividade(
  payload: CadastroAtividade
): Promise<{ status: number }> {
  const { status } = await api.post("/nova-atividade", payload, token());
  return { status };
}

export async function postProjetoTipo(
  payload: CadastroProjetoTipo
): Promise<{ status: number }> {
  const { status } = await api.post("/campanha-projeto-tipo", payload, token());
  return { status };
}

export async function postNovoPoco(
  payload: NovoPoco
): Promise<{ status: number }> {
  const { status } = await api.post("/poco", payload, token());
  return { status };
}

export async function postNovaCampanha(
  payload: NovaCampanha
): Promise<{ status: number }> {
  const { status } = await api.post("/campanha/pai", payload, token());
  return { status };
}

export async function postNovaIntervencao(
  payload: NovaIntervencao
): Promise<{ status: number }> {
  const { status } = await api.post("/campanha/filho", payload, token());
  return { status };
}

export async function postNovaAtividade(
  payload: NovaAtividade
): Promise<{ status: number }> {
  const { status } = await api.post(
    "/campanha/filho/atividade",
    payload,
    token()
  );
  return { status };
}

export async function postEditarAtividadeStatus(
  campanhaId: number,
  atividadeStatus: number
): Promise<{ status: number }> {
  const { status } = await api.patch(
    `/campanha/${campanhaId}/pct_real/${atividadeStatus}`,
    token()
  );
  return { status };
}

export async function postCadastroAtividadeIntervencao(
  id: number,
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(
    `/nova-atividade/intervencao/${id}`,
    payload,
    token()
  );
  return { status };
}

export async function patchEditarAtividadeIntervencao(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.patch(`/campanha/`, payload, token());
  return { status };
}

export async function postReplanejarCampanha(
  payload: any,
  idCampanha: number
): Promise<{ status: number }> {
  const { status } = await api.post(
    `/campanha/replanejar/${idCampanha}`,
    payload,
    token()
  );
  return { status };
}

export async function postReorderIntervencao(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(
    "/intervencoes/realocacao",
    payload,
    token()
  );
  return { status };
}

export async function postReorder(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/campanha/replanejar", payload, token());
  return { status };
}
