import { api, token } from "services/api";

export async function postCadastroOperacao(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/nova-operacao", payload, token());
  return { status };
}

export async function postCadastroNovoCronograma(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/projetos-atividades", payload, token());
  return { status };
}
