import { CreateServicoFerramenta } from "interfaces/lookahead";

import { api } from "services/api";

export async function createAtividadeFerramenta(
  ferramenta: CreateServicoFerramenta
) {
  const { data } = await api.post(`/atividade-ferramentas`, ferramenta);
  return data;
}

export async function createAtividadeServico(servico: CreateServicoFerramenta) {
  const { data } = await api.post(`/atividade-servicos`, servico);
  return data;
}
