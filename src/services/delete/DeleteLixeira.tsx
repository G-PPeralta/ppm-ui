// CRIADO EM: 17/11/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculadas à tela de Lixeira (permanente).

import { api, token } from "services/api";

export async function deleteLixeira(
  id: number,
  table_name: string
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `lixeira/${id}/${table_name}`,
    token()
  );

  return { data, status };
}
