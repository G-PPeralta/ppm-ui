export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  avatar?: string;
  nome?: string;
}

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
