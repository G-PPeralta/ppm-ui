import { BudgetPlan, BudgetReal } from "interfaces/Budgets";

import { api, token } from "services/api";

export async function postAatualizarValorPrevisto(
  payload: BudgetPlan
): Promise<{ status: number }> {
  const { status } = await api.post(
    "/budgets/orcamento-previsto",
    payload,
    token()
  );
  return { status };
}

export async function postAddValorRealizado(
  payload: BudgetReal
): Promise<{ status: number }> {
  const { status } = await api.post(
    "/budgets/orcamento-real",
    payload,
    token()
  );
  return { status };
}
