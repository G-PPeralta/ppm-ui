export const addOutroFinalArray = (array: any, nomeChave: string) => {
  const outro: any = {
    id: 0,
    [nomeChave]: "Outro",
    deletado: false,
  };

  const arrayComOutroAoFinalArray: any = [...array, outro];

  return arrayComOutroAoFinalArray;
};
