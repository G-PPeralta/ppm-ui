// CRIADO EM: 14/11/2022
// AUTOR: Gabriel Peralta
// DESCRIÇÃO DO ARQUIVO: Função com regex coringas, depende do objetivo.

export const regexCaracteresEspeciais = (stringToReplace: string) =>
  stringToReplace.replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'",.<>{}[]\]*/gi, "");

export const regexCaracteresEspeciaisENumeros = (stringToReplace: string) =>
  stringToReplace.replace(
    /[1234567890§ª°º`´¨~!@#$%^&*()/_|+=?;:'",.<>{}[]\]*/gi,
    ""
  );

export const regexSomenteNumeros = (stringToReplace: string) =>
  stringToReplace.replace(/\D/g, "");

export const regexSomenteNumerosMonetario = (
  stringToReplace: string | undefined | null
) => (stringToReplace ? stringToReplace.replace(/\D/g, "") : null);

export const regexCnpj = (stringToReplace: string | undefined | null) =>
  stringToReplace
    ? stringToReplace

        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    : null;
