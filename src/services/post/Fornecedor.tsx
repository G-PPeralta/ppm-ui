import { api, token } from "services/api";

export async function postCadastroFornecedor(
  payload: any
): Promise<{ status: number }> {
  const { status } = await api.post("/fornecedores", payload, token());
  return { status };
}
