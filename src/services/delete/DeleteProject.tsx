// CRIADO EM: 21/09/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Carteira de Projetos.

import { api, token } from "services/api";

export async function deleteProject(
  id_projeto: any,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/projetos/${id_projeto}/${user}`,
    token()
  );

  return { data, status };
}

export async function deleteAtividade(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/gantt/${id}/${user}`, token());

  return { data, status };
}
