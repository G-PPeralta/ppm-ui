export const formatarDigitosData = (data: number) => {
  if (data.toString().length === 1) {
    return `0${data}`;
  }
  return data;
};
