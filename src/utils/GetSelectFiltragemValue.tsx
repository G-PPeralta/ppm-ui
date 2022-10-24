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
