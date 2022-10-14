export function formatUSD(int: number) {
  return int.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
