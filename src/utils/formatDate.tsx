// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para formato padrão de data.

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

export function formatMinutesToHHmm(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesRest = minutes % 60;
  return `${hours}h${padTo2Digits(minutesRest)}`;
}

export function formatFloatToMinutes(float: number) {
  const minutes = float * 60;
  return minutes;
}

export function formatMinutesToHours(minutes: number) {
  const hours = minutes / 60;
  return hours;
}

export function formatDateToddMMyyyy(date: Date | string) {
  const dateFormated = new Date(date);
  return [
    padTo2Digits(dateFormated.getDate()),
    padTo2Digits(dateFormated.getMonth() + 1),
    dateFormated.getFullYear(),
  ].join("/");
}

export function formatDateToddMMyyyyhhmmCronograma(
  date: Date | null,
  inicioOuFim: string
) {
  if (inicioOuFim === "fim") {
    if (date === null) {
      return null;
    } else {
      const dateFormated = new Date(date);
      dateFormated.setHours(18);
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
  } else if (inicioOuFim === "inicio") {
    if (date === null) {
      return null;
    } else {
      const dateFormated = new Date(date);
      dateFormated.setHours(9);
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
}
