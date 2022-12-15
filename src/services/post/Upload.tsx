import { api, tokenFile } from "services/api";

export async function uploadArquivo(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/pdf/one", payload, tokenFile());
  return { status };
}

export async function uploadArquivoS3(
  payload: any
): Promise<{ status: number }> {
  const url = await api.post("/s3", payload, tokenFile());
  return url;
}
