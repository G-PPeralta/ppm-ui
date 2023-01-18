// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para formato padrão de USD.

export function formatUSD(int: number) {
  return int.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
