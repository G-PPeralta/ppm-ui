import { api } from "services/api";

export async function deleteLicao(
  id: number,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.delete(
    `projetos-atividades-licoes-aprendidas/${id}/${user}`
  );

  return { data, status };
}
