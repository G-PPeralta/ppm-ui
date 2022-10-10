import { ResetPasswordProps, ResponseResetPassword } from "interfaces/Services";

import { api } from "services/api";

export async function postResetPassword(
  payload: ResetPasswordProps
): Promise<{ data: ResponseResetPassword; status: number }> {
  const { data, status } = await api.post("/user/resetar-senha", payload);

  return { data, status };
}
