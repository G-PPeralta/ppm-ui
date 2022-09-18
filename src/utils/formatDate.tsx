// Referência:
// https://bobbyhadz.com/blog/javascript-format-date-dd-mm-yyyy#:~:text=To%20format%20a%20date%20as,value%20is%20less%20than%2010%20.

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}
