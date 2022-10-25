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
