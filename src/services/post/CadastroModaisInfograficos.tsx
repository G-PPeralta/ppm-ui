import {
  CadastroTarefa,
  CadastroProjetoTipo,
  CadastroIntervencao,
  CadastroAtividade,
  NovaCampanha,
  NovaIntervencao,
  NovoPoco,
  NovaSonda,
} from "interfaces/CadastrosModaisInfograficos";

import { api, token } from "services/api";

export async function postCadastroTarefa(
  payload: CadastroTarefa
): Promise<{ status: number }> {
  const { status } = await api.post("/tarefa", payload, token());
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
  const { status } = await api.post(
    "/atividades-intervencoes",
    payload,
    token()
  );
  return { status };
}

export async function postProjetoTipo(
  payload: CadastroProjetoTipo
): Promise<{ status: number }> {
  const { status } = await api.post("/projeto-intervencao", payload, token());
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
  const { status } = await api.post("/campanha", payload, token());
  return { status };
}

export async function postNovaIntervencao(
  payload: NovaIntervencao
): Promise<{ status: number }> {
  const { status } = await api.post("/campanha/filho", payload, token());
  return { status };
}
