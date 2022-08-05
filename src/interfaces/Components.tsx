export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  avatar?: string;
  nome?: string;
}

export interface StackedBarChartProps {
  sizeW: number;
  sizeH: number;
  numberBars: number;
  barW: number;
  showY: boolean;
  totalBudget?: number;
}
