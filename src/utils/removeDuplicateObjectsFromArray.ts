// CRIADO EM: 14/11/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função para remoção de valores duplicados numa lista de atividades.

export const getUniqueActivities = (atividades: any, duplicatedValue: string) =>
  atividades.reduce((acc: any, current: any) => {
    const x = acc.find(
      (item: any) => item[duplicatedValue] === current[duplicatedValue]
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
