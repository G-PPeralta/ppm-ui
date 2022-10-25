import { api, token } from "services/api";

export async function postCadastroOperacao(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/nova-operacao", payload, token());
  return { status };
}

export async function postCadastroSondaOperacao(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/nova-operacao/sonda", payload, token());
  return { status };
}

export async function postCadastroPocoOperacao(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/nova-operacao/poco", payload, token());
  return { status };
}

export async function postCadastroNovoCronograma(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/projetos-atividades", payload, token());
  return { status };
}

export async function postCadastroNovaLicaoAprendidaPorAtividade(
  // id: number,
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(
    `projetos-atividades-licoes-aprendidas`,
    payload,
    token()
  );
  return { status };
}

export async function postCadastroNovaOcorrenciaPorAtividade(
  id: number,
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(
    `/estatisticas/cronograma/${id}/ocorrencia`,
    payload,
    token()
  );
  return { status };
}
