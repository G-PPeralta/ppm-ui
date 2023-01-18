// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função que formata em função do tipo de dado recebido.

export const formataParaTipo = (tipo: string, val: number) => {
  if (tipo === "porcentagem") {
    return val + "%";
  }
  if (tipo === "hora") {
    return val + "h";
  }
  if (tipo === "dias") {
    const isPlural = val > 1 ? " dias" : " dia";
    return val + isPlural;
  }
  if (tipo === "metros") {
    const isPlural = val > 1 ? " metros" : " metro";
    return val + isPlural;
  }
  return val;
};
