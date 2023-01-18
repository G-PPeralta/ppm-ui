// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para formatar data caso nula.

export const formatarDigitosData = (data: number) => {
  if (data.toString().length === 1) {
    return `0${data}`;
  }
  return data;
};
