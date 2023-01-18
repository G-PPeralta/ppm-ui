// CRIADO EM: 16/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Lições Aprendidas - módulo Projetos.

import { api, token } from "services/api";

export async function deleteLicao(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `projetos-atividades-licoes-aprendidas/${id}/${user}`,
    token()
  );

  return { data, status };
}
