// CRIADO EM: 28/09/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para rota(s) de get vinculada(s) às Atividades dos Projetos.

import { AtividadesProjeto } from "interfaces/Services";

import { api, token } from "services/api";

export async function getAtividadesProjeto(id: number): Promise<{
  data: AtividadesProjeto[];
  status: number;
}> {
  const { data, status } = await api.get(`/atividades-projetos/${id}`, token());

  return { data, status };
}
