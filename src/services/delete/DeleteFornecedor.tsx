import { api } from "services/api";

export async function deleteFornecedor(
  id: number
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(`/fornecedores/delete/${id}`);

  return { data, status };
}
