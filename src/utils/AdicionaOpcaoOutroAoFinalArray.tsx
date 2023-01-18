// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função que adiciona o item Outro como mais uma opção num Select específico.

export const addOutroFinalArray = (array: any, nomeChave: string) => {
  const outro: any = {
    id: 0,
    [nomeChave]: "Outro",
    deletado: false,
  };

  const arrayComOutroAoFinalArray: any = [...array, outro];

  return arrayComOutroAoFinalArray;
};
