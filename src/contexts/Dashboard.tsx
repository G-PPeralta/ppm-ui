import { createContext, useContext, useEffect, useState } from "react";

import {
  getOrcamentoTotal,
  getTotalNaoPrevisto,
  getTotalRealizado,
} from "services/get/Dashboard";

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
    const reqTotalNaoPrevisto = await getTotalNaoPrevisto();

    if (reqOrcamentoTotal.data[0].total) {
      const porcentagemRealizado =
        (reqTotalRealizado.data[0].totalRealizado /
          reqOrcamentoTotal.data[0].total) *
        100;

      // PORCENTAGEM NÃO PREVISTO
      // É O RESTO DO TOTAL REALIZADO - ORÇAMENTO TOTAL
      // EXEMPLO: ORÇAMENTO TOTAL = 1000
      // TOTAL REALIZADO = 1200
      // TOTAL NÃO PREVISTO = 200
      // PORCENTAGEM NÃO PREVISTO = 200 / 1000 * 100 = 20%
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
        valorNaoPrevisto: reqTotalNaoPrevisto.data[0].totalNaoPrevisto,
        porcentagemNaoPrevisto:
          porcentagemRealizado > 100 ? porcentagemNaoPrevisto : 0,
      });
    }
  }

  useEffect(() => {
    handleRequests();
  }, []);

  useEffect(() => {
    // if (initialValues.valorTotalOrcamento !== 0) {
    //   setLoading(false);
    // }
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
