// CRIADO EM: 23/12/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) ao upload de arquivos.

import { api, tokenFile, token } from "services/api";

export async function uploadArquivo(payload: any): Promise<{ status: number }> {
  const { status } = await api.post("/pdf/one", payload, tokenFile());
  return { status };
}

export async function uploadArquivoS3(payload: any): Promise<any> {
  const { data, status } = await api.post("/s3", payload, token());
  return {
    data,
    status,
  };
}
