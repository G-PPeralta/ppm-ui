/* export function maskMoney(event: any) {
  const input = event.target;
  let money = event.target.value;
  const length = money.length;

  money = money.replace(/(\D)/g, "");

  if (length >= 11)
    return (input.value = money.replace(
      /^(\d{1})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3,$4"
    ));
  if (length >= 10)
    return (input.value = money.replace(/^(\d{3})(\d{3})(\d{2})$/, "$1.$2,$3"));
  if (length >= 9)
    return (input.value = money.replace(/^(\d{2})(\d{3})(\d{2})$/, "$1.$2,$3"));
  if (length >= 7)
    return (input.value = money.replace(/^(\d{1})(\d{3})(\d{2})$/, "$1.$2,$3"));
  if (length >= 6)
    return (input.value = money.replace(/^(\d{3})(\d{2})$/, "$1,$2"));
  if (length >= 5)
    return (input.value = money.replace(/^(\d{2})(\d{2})$/, "$1,$2"));
  if (length >= 3)
    return (input.value = money.replace(/^(\d{1})(\d{2})$/, "$1,$2"));
} */

export function getMoney(str: string | null): string | null {
  if (str === undefined || str === null) return null;
  if (typeof str == "number") return str;
  return str.replace(/[\D]+/g, "");
}
export function formatReal(number: string | null): string {
  let tmp = number + "";
  tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
  if (tmp.length >= 3) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

  return tmp;
}
export function parseNumber(money: string): number {
  let temp = getMoney(money) || "000";
  temp = `${temp.substring(0, temp.length - 2)}.${temp.substring(
    temp.length - 2
  )}`;

  return +temp;
}

export function parserString(value: number) {
  return value.toFixed(2).toString();
}

export function formatRealInput(value: string) {
  if (typeof value == "number") return value;
  let formatedValue = value.replace(/\D/g, "");

  if (formatedValue.length === 4) {
    formatedValue = formatedValue.replace(/^(0)/, "");
  }

  formatedValue = formatedValue.replace(/(\d{1,2})$/, ",$1");
  formatedValue = formatedValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return formatedValue;
}
