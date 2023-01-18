// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para validar correto formato de email.

export const verifyEmail = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
