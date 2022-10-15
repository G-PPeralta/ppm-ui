import { api, token } from "services/api";

export async function deleteDespesa(
  idCusto: number,
  nomeUsuario: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/centro-custo/${idCusto}/${nomeUsuario}`,
    token()
  );

  return { data, status };
}
