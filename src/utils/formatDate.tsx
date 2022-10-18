// Referência:
// https://bobbyhadz.com/blog/javascript-format-date-dd-mm-yyyy#:~:text=To%20format%20a%20date%20as,value%20is%20less%20than%2010%20.

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date | null | string) {
  if (date === null) {
    return null;
  } else {
    const dateFormated = new Date(date);
    return [
      padTo2Digits(dateFormated.getDate()),
      padTo2Digits(dateFormated.getMonth() + 1),
      dateFormated.getFullYear(),
    ].join("/");
  }
}

// formata data para o formato yyyy-mm-dd
export function formatDateToYMD(date: Date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

export function formatDateToddMMyyyyhhmm(date: Date | null) {
  if (date === null) {
    return null;
  } else {
    const dateFormated = new Date(date);
    const data: any = [
      padTo2Digits(dateFormated.getDate()),
      padTo2Digits(dateFormated.getMonth() + 1),
      dateFormated.getFullYear(),
    ].join("/");
    const time = [
      padTo2Digits(dateFormated.getHours()),
      padTo2Digits(dateFormated.getMinutes()),
    ].join(":");
    return data + ", " + time;
  }
}

export function formatDateToYYYYMMDDhhmmss(date: Date | null) {
  if (date === null) {
    return null;
  } else {
    const dateFormated = new Date(date);
    const data: any = [
      dateFormated.getFullYear(),
      padTo2Digits(dateFormated.getMonth() + 1),
      padTo2Digits(dateFormated.getDate()),
    ].join("-");
    const time = [
      padTo2Digits(dateFormated.getHours()),
      padTo2Digits(dateFormated.getMinutes()),
      padTo2Digits(dateFormated.getSeconds()),
    ].join(":");
    return data + " " + time;
  }
}
