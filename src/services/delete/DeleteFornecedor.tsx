import { api, token } from "services/api";

export async function deleteFornecedor(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/fornecedores/${id}/${user}`,
    token()
  );

  return { data, status };
}
