// CRIADO EM: 10/01/2022
// AUTOR: Geovana Augusta
// DESCRIÇÃO DO ARQUIVO: Função para aceitar apenas números e pontos.

export const regexNumerosEPonto = (stringToReplace: string | any) =>
  stringToReplace
    .replace(/[a-z]/gi, "")
    .replace(/[§ª°º`´¨~!@#$%^&*()_|+=?;:'/",<>{}[]\]*/gi, "");
