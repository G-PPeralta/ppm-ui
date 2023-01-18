// CRIADO EM: 14/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Priorização - módulo Configuração.

import { api, token } from "services/api";

export async function deletePriorizacao(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(`/rankings/${id}/${user}`, token());

  return { data, status };
}

export async function deleteOpcaoPriorizacao(
  id: number,
  user: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/rankings-opcoes/${id}/${user}`,
    token()
  );

  return { data, status };
}
