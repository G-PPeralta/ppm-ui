// CRIADO EM: 24/10/2022
// AUTOR:Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de patch vinculada(s) à tela de Lições Aprendidas.

import { api, token } from "services/api";

export async function patchLicaoAprendida(
  id: number,
  campo: any,
  payload: string,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `projetos-atividades-licoes-aprendidas/${id}/${campo}/${payload}/${user}`,
    token()
  );

  return { data, status };
}
