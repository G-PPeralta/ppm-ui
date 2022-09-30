import { api } from "services/api";

export async function patchTarefa(
  id: number,
  campo: any,
  payload: string,
  user: any
): Promise<{ data: any; status: number }> {
  const { data, status } = await api.patch(
    `/tarefas/${id}/${campo}/${payload}/${user}`
  );

  return { data, status };
}
