import { api, token } from "services/api";

export async function deleteCampanha(
  idCampanha: number,
  idAtividade: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.post(
    `/campanha/delete/${idCampanha}/${idAtividade}`,
    token()
  );

  return { data, status };
}
