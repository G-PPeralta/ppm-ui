import { api } from "services/api";

export async function patchLicaoAprendida(
  id: number,
  campo: any,
  payload: string,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `projetos-atividades-licoes-aprendidas/${id}/${campo}/${payload}/${user}`
  );

  return { data, status };
}
