import { api } from "services/api";

export async function deleteFeriado({ id, user }: any) {
  await api.delete(`/feriados/${id}/${user}`);
}
