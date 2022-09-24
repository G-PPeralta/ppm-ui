import { LicoesAprendidasPayload } from "interfaces/Services";

import { api } from "services/api";

export async function postLicaoAprendida(
  payload: LicoesAprendidasPayload
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    "/projetos-atividades-licoes-aprendidas",
    payload
  );

  return { data, status };
}
