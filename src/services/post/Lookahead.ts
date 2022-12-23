import { CreateServicoFerramenta } from "interfaces/lookahead";

import { api, token } from "services/api";

export async function createAtividadeFerramenta(
  ferramenta: CreateServicoFerramenta
) {
  const { data } = await api.post(
    `/atividade-ferramentas`,
    ferramenta,
    token()
  );
  return data;
}

export async function createAtividadeServico(servico: CreateServicoFerramenta) {
  const { data } = await api.post(`/atividade-servicos`, servico, token());
  return data;
}
