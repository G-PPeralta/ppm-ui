// CRIADO EM: 10/11/2022
// AUTOR:Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Context hook com o cálculo de porcentagem - Dashboard.

import { createContext, useContext, useEffect, useState } from "react";

import { getOrcamentoTotal, getTotalRealizado } from "services/get/Dashboard";

type IDashboardProps = {
  valorTotalOrcamento: number;
  valorRealizado: number;
  valorNaoPrevisto: number;
  porcentagemRealizado: string | number;
  porcentagemNaoPrevisto: string | number;
};

const DashboardContext = createContext<any>({} as any);

export const DashboardProvider = ({ children }: any) => {
  const [initialValues, setInitialValues] = useState<IDashboardProps>({
    valorTotalOrcamento: 0,
    valorRealizado: 0,
    porcentagemRealizado: 0,
    valorNaoPrevisto: 0,
    porcentagemNaoPrevisto: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  async function handleRequests() {
    const reqOrcamentoTotal = await getOrcamentoTotal();
    const reqTotalRealizado = await getTotalRealizado();

    if (reqOrcamentoTotal.data[0].total > 0) {
      const porcentagemRealizado =
        (reqTotalRealizado.data[0].totalRealizado /
          reqOrcamentoTotal.data[0].total) *
        100;
      const porcentagemNaoPrevisto =
        ((reqTotalRealizado.data[0].totalRealizado -
          reqOrcamentoTotal.data[0].total) /
          reqOrcamentoTotal.data[0].total) *
        100;

      setInitialValues({
        valorTotalOrcamento: reqOrcamentoTotal.data[0].total,
        valorRealizado: reqTotalRealizado.data[0].totalRealizado,
        porcentagemRealizado:
          porcentagemRealizado > 100 ? 100 : porcentagemRealizado,
        valorNaoPrevisto:
          reqOrcamentoTotal.data[0].total -
          reqTotalRealizado.data[0].totalRealizado,
        porcentagemNaoPrevisto:
          porcentagemRealizado > 100 ? porcentagemNaoPrevisto : 0,
      });
    }
  }

  useEffect(() => {
    handleRequests();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [initialValues]);

  return (
    <DashboardContext.Provider value={{ ...initialValues, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboard() {
  const context = useContext(DashboardContext);
  return context;
}
