import { api, token } from "services/api";

export async function patchProjeto(
  id: number,
  payload: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(`/projetos/${id}`, payload, token());

  return { data, status };
}
