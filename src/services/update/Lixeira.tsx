// CRIADO EM: 24/10/2022
// AUTOR:Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Lixeira.

import { api, token } from "services/api";

export async function restoreLixeira(
  id: number,
  table_name: string
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `lixeira/${id}/${table_name}`,
    token()
  );

  return { data, status };
}
