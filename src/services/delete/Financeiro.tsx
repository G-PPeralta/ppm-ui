// CRIADO EM: 21/09/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de delete vinculada(s) à tela de Financeiro.

import { api, token } from "services/api";

export async function deleteDespesa(
  idCusto: number,
  nomeUsuario: string | undefined
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `/centro-custo/${idCusto}/${nomeUsuario}`,
    token()
  );

  return { data, status };
}
export async function deleteCustoReal(
  id: number
): Promise<{ data: any; status: number }> {
  const uri = `/budgets/orcamento-real/${id}`;
  const { data, status } = await api.delete(uri, token());

  return { data, status };
}

export async function deleteDespesaTabela(
  id: number
): Promise<{ data: any; status: number }> {
  const uri = `projetos-financeiro/delete/${id}`;
  const { data, status } = await api.delete(uri, token());

  return { data, status };
}
