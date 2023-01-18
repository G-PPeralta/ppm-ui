// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para aceitar apenas números e ponto.

export const regexNumerosEPonto = (stringToReplace: string | any) =>
  stringToReplace
    .replace(/[a-z]/gi, "")
    .replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'/"<>{}[]\]*/gi, "");
