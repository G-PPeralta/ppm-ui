import { api, token } from "services/api";

export async function getOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao", token());

  return { data, status };
}

export async function getPocosOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao/poco", token());

  return { data, status };
}

export async function getSondasOperacoes(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/nova-operacao/sonda", token());

  return { data, status };
}

export async function getLicoesAprendidasPorAtividade(
  idAtividade: number
): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `projetos-atividades-licoes-aprendidas/${idAtividade}`,
    token()
  );

  return { data, status };
}

export async function getOcorrenciasPorAtividade(idAtividade: number): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/ocorrencias/${idAtividade}`,
    token()
  );

  return { data, status };
}

export async function getDuracaoHorasAdicionarAtividade(
  idOperacao: number
): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get(
    `/filtros/media-hora/${idOperacao}`,
    token()
  );

  return { data, status };
}

export async function getSondasAtividadeOperacao(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/filtros/sondas", token());

  return { data, status };
}

export async function getPocosAtividadeOperacao(): Promise<{
  data: any;
  status: number;
}> {
  const { data, status } = await api.get("/filtros/pocos", token());

  return { data, status };
}
