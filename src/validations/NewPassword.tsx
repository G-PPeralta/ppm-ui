import * as yup from 'yup';

export const newPasswordSchema = yup.object({
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  newPassword: yup
    .string()
    .required('Campo obrigatório')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'As senhas não conferem'),
});
