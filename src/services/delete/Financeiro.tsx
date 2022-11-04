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
export async function deleteCustoReal(
  id: number
): Promise<{ data: any; status: number }> {
  const uri = `/budgets/orcamento-real/${id}`;
  const { data, status } = await api.delete(uri, token());

  return { data, status };
}
