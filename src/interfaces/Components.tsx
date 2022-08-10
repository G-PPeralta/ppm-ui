export interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  avatar?: string;
  nome?: string;
}

export interface StackedBarChartProps {
  sizeW: number;
  sizeH: number;
  barW: number;
  showY: boolean;
  totalBudget?: number;
  data: any;
  dataEntries: {
    name: string;
    color: string;
  }[];
}
