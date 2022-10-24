import { api, token } from "services/api";

export async function postCadastroDespesa(
  idProjeto: number,
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post(
    `/centro-custo/${idProjeto}`,
    payload,
    token()
  );
  return { status };
}
