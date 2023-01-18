// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para formato padrão de e-mail.

export const formatEmail = (email: string) =>
  email.replace(/[^a-zA-Z0-9@.]/g, "");
