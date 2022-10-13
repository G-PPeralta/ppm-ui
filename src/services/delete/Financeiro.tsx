import { api, token } from "services/api";

export async function deleteDespesa(
  idCusto: number,
  idUsuario: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/centro-custo/${idCusto}/${idUsuario}`,
    token()
  );

  return { data, status };
}
