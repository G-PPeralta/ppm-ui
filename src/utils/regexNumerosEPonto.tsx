export const regexNumerosEPonto = (stringToReplace: string | any) =>
  // Caracteres permitidos:
  // 0-9 (números)
  // . (ponto)
  // , (vírgula)
  stringToReplace
    .replace(/[a-z]/gi, "")
    .replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'/"<>{}[]\]*/gi, "");
