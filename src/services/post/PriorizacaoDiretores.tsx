import { api, token } from "services/api";

export async function getPriorizacaoDiretores() {
  const { data, status } = await api.get("/priorizacoes", token());
  return { data, status };
}

export async function postPriorizacaoDiretores(payload: any) {
  const { status } = await api.post("/priorizacoes", payload, token());
  return { status };
}
