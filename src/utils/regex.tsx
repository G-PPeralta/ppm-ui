export const regexCaracteresEspeciais = (stringToReplace: string) =>
  stringToReplace.replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'",.<>{}[]\]*/gi, "");

export const regexCaracteresEspeciaisENumeros = (stringToReplace: string) =>
  stringToReplace.replace(
    /[1234567890§ª°º`´¨~!@#$%^&*()_|+=?;:'",.<>{}[]\]*/gi,
    ""
  );

export const regexSomenteNumeros = (stringToReplace: string) =>
  // .match(/[0-9]+/g).join([]);
  stringToReplace.replace(/\D/g, "");
