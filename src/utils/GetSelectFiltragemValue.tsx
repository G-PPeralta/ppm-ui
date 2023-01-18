// CRIADO EM: 14/11/2022
// AUTOR: Eduardo Muchak
// DESCRIÇÃO DO ARQUIVO: Função para uso na edição de atividade.

export const getSelectFiltragemValue = (
  options: any,
  chave: string,
  registerForm: any
) => {
  const index = options
    .map(({ value }: any) => value)
    .indexOf(registerForm?.values?.[chave]);

  return {
    value: options?.[index]?.value,
    label: options?.[index]?.label,
  };
};

export const getCheckboxValue = (registerForm: any, chave: string) =>
  registerForm?.values?.[chave];
