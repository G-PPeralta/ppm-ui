export const regexCaracteresEspeciais = (stringToReplace: string) =>
  stringToReplace.replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'",.<>{}[]\]*/gi, "");
