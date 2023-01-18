// CRIADO EM: 23/12/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculada(s) à tela de Feriados - Configurações.

import { api, token } from "services/api";

export async function deleteFeriado({ id, user }: any) {
  await api.delete(`/feriados/${id}/${user}`, token());
}
