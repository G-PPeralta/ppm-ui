// CRIADO EM: 23/09/2022
// AUTOR:Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de post vinculada(s) à tela Lookahed.

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
