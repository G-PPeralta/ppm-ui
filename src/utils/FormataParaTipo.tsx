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
  return val;
};
