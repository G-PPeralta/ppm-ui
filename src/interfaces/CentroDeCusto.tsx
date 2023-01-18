// CRIADO EM: 12/12/2022
// AUTOR: GEOVANA AUGUSTA
// DESCRIÇÃO DO ARQUIVO: ARQUIVO DE INTERFACES DO CENTRO DE CUSTO

export interface Data {
  idCusto: number;
  prestadorDeServico: string;
  classeDoServico: string;
  dataPagamento: Date;
  valor: number;
  descricaoDoServico: string;
  pedido: string;
  classeDeServicoId: number;
  prestadorDeServicoId: number;
  bm: string;
  id_nf: string;
  valor_bm_nf: string;
  status: number;
  data_pagamento: Date;
  valor_pago: string;
}

export interface Options {
  optionsClassesDeServico: [value: number, label: string];
  optionsFornecedores: [value: number, label: string];
}

export interface DatePicker {
  registerForm: any;
  data?: Date;
  propName: string;
  nomeLabel: string;
  required?: boolean;
  selecionaHorario?: boolean;
  isDisabled?: boolean;
  esconderHorario?: boolean;
  mes?: any;
  dataInicial?: Date;
  dates?: any;
}
