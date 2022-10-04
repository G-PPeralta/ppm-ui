export function formatReal(int: number) {
  return int.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
