// CRIADO EM: 13/06/2022
// AUTOR: ALEXANDER BRITO
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DO GRÁFICO DE BARRAS

export interface StackedBarChartProps {
  sizeW: number | string;
  sizeH: number | string;
  barW: number;
  showY: boolean;
  totalBudget?: number;
  data: any;
  dataEntries: {
    name: string;
    color: string;
  }[];
}
