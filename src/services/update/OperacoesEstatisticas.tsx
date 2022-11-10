import { api, token } from "services/api";

export async function patchOperacoesEstatisticas(
  // id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/editar-atividade/`,
    payload,
    token()
  );

  return { data, status };
}
