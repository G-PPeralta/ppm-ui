import { ProjetosRankingPayload } from "interfaces/Services";

import { api } from "services/api";

export async function postProject(
  payload: ProjetosRankingPayload
): Promise<{ status: number }> {
  const { status } = await api.post("/projetos-ranking", payload);
  return { status };
}

// id_projeto: number; -- item que foi clicado na tela (o botão de ação)
// id_ranking: number; -- beneficio por exemplo, complexidade, etc
// id_opcao: number; -- opção dentro do ranking
// dsc_comentario: string; -- comentario -- sempre null porque não tem
// nom_usu_create: string; -- pegar nome do usuario
