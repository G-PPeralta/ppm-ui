import { api, tokenFile } from "services/api";

export async function uploadArquivo(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/pdf/one", payload, tokenFile());
  return { status };
}
